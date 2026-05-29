import { Hono } from "npm:hono@4";
import { cors } from "npm:hono@4/cors";
import { logger } from "npm:hono@4/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1f373955/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-1f373955/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields: email, password, name" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // First, check if user already exists by trying to list users with this email
    const { data: usersList } = await supabase.auth.admin.listUsers();
    const existingUser = usersList?.users?.find(user => user.email === email);
    if (existingUser) {
      console.log('User already exists with email:', email);
      return c.json({ 
        error: "User already exists",
        code: "USER_EXISTS",
        message: "An account with this email already exists. Please sign in instead." 
      }, 409);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name: name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Supabase auth error during user creation:', error);
      // Check if it's a user already exists error
      if (error.message?.includes('already been registered') || error.message?.includes('already exists')) {
        return c.json({ 
          error: "User already exists",
          code: "USER_EXISTS", 
          message: "An account with this email already exists. Please sign in instead."
        }, 409);
      }
      return c.json({ error: error.message }, 400);
    }

    console.log('User created successfully:', data.user?.email);
    return c.json({ 
      success: true, 
      user: { 
        id: data.user?.id, 
        email: data.user?.email,
        name: data.user?.user_metadata?.name 
      } 
    });

  } catch (error) {
    console.error('Error during user signup:', error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Get profile endpoint
app.get("/make-server-1f373955/profile/:email", async (c) => {
  try {
    const email = c.req.param('email');
    
    if (!email) {
      return c.json({ error: "Email parameter required" }, 400);
    }

    const profileKey = `profile:${email}`;
    const profile = await kv.get(profileKey);

    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    // Return profile without sensitive information
    const { created_at, updated_at, ...publicProfile } = profile;
    return c.json({ profile: publicProfile });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return c.json({ error: "Internal server error while fetching profile" }, 500);
  }
});

// Profile setup endpoint
app.post("/make-server-1f373955/profile-setup", async (c) => {
  try {
    const profileData = await c.req.json();
    
    if (!profileData.email || !profileData.name || !profileData.nationality || !profileData.city) {
      return c.json({ error: "Missing required fields: email, name, nationality, city" }, 400);
    }

    // Store profile data in KV store using email as key
    const profileKey = `profile:${profileData.email}`;
    const profile = {
      ...profileData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await kv.set(profileKey, profile);

    // Also store a reverse lookup for profile discovery
    const userListKey = 'users:all';
    const existingUsers = await kv.get(userListKey) || [];
    const updatedUsers = [...existingUsers, profileData.email];
    await kv.set(userListKey, updatedUsers);

    console.log('Profile created successfully for:', profileData.email);
    return c.json({ 
      success: true, 
      message: "Profile setup completed successfully" 
    });

  } catch (error) {
    console.error('Error during profile setup:', error);
    return c.json({ error: "Internal server error during profile setup" }, 500);
  }
});

// Create event endpoint
app.post("/make-server-1f373955/events", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventData = await c.req.json();
    
    if (!eventData.title || !eventData.description || !eventData.category || !eventData.date || !eventData.startTime || !eventData.city || !eventData.address || !eventData.price) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Generate unique event ID
    const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const event = {
      id: eventId,
      hostId: user.id,
      hostEmail: user.email,
      ...eventData,
      status: 'published',
      attendees: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Store event
    const eventKey = `event:${eventId}`;
    await kv.set(eventKey, event);

    // Add to events list
    const allEventsKey = 'events:all';
    const existingEvents = await kv.get(allEventsKey) || [];
    const updatedEvents = [...existingEvents, eventId];
    await kv.set(allEventsKey, updatedEvents);

    // Add to host's events list
    const hostEventsKey = `events:host:${user.id}`;
    const hostEvents = await kv.get(hostEventsKey) || [];
    const updatedHostEvents = [...hostEvents, eventId];
    await kv.set(hostEventsKey, updatedHostEvents);

    console.log('Event created successfully:', eventId);
    return c.json({ 
      success: true, 
      eventId: eventId,
      message: "Event created successfully" 
    });

  } catch (error) {
    console.error('Error creating event:', error);
    return c.json({ error: "Internal server error during event creation" }, 500);
  }
});

// Get events endpoint
app.get("/make-server-1f373955/events", async (c) => {
  try {
    const city = c.req.query('city');
    const category = c.req.query('category');
    const limit = parseInt(c.req.query('limit') || '20');
    
    const allEventsKey = 'events:all';
    const eventIds = await kv.get(allEventsKey) || [];
    
    let events = [];
    for (const eventId of eventIds.slice(0, limit)) {
      const eventKey = `event:${eventId}`;
      const event = await kv.get(eventKey);
      if (event) {
        // Filter by city and category if specified
        if (city && !event.city.toLowerCase().includes(city.toLowerCase())) {
          continue;
        }
        if (category && event.category !== category) {
          continue;
        }
        events.push(event);
      }
    }

    return c.json({ events });

  } catch (error) {
    console.error('Error fetching events:', error);
    return c.json({ error: "Internal server error while fetching events" }, 500);
  }
});

// Get user's hosted events
app.get("/make-server-1f373955/events/hosted", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const hostEventsKey = `events:host:${user.id}`;
    const eventIds = await kv.get(hostEventsKey) || [];
    
    let events = [];
    for (const eventId of eventIds) {
      const eventKey = `event:${eventId}`;
      const event = await kv.get(eventKey);
      if (event) {
        events.push(event);
      }
    }

    return c.json({ events });

  } catch (error) {
    console.error('Error fetching hosted events:', error);
    return c.json({ error: "Internal server error while fetching hosted events" }, 500);
  }
});

// Join event endpoint
app.post("/make-server-1f373955/events/:eventId/join", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const eventId = c.req.param('eventId');
    const eventKey = `event:${eventId}`;
    const event = await kv.get(eventKey);

    if (!event) {
      return c.json({ error: "Event not found" }, 404);
    }

    // Check if user is already registered
    if (event.attendees.some((attendee: any) => attendee.userId === user.id)) {
      return c.json({ error: "Already registered for this event" }, 400);
    }

    // Check capacity
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return c.json({ error: "Event is full" }, 400);
    }

    // Add user to attendees
    const attendee = {
      userId: user.id,
      userEmail: user.email,
      joinedAt: new Date().toISOString(),
      status: event.requiresApproval ? 'pending' : 'confirmed'
    };

    event.attendees.push(attendee);
    event.updated_at = new Date().toISOString();

    await kv.set(eventKey, event);

    // Add to user's joined events
    const userEventsKey = `events:user:${user.id}`;
    const userEvents = await kv.get(userEventsKey) || [];
    const updatedUserEvents = [...userEvents, eventId];
    await kv.set(userEventsKey, updatedUserEvents);

    return c.json({ 
      success: true, 
      status: attendee.status,
      message: attendee.status === 'pending' ? 'Registration pending approval' : 'Successfully joined event'
    });

  } catch (error) {
    console.error('Error joining event:', error);
    return c.json({ error: "Internal server error while joining event" }, 500);
  }
});

Deno.serve(app.fetch);