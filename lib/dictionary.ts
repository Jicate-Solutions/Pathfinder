/**
 * Bilingual UI copy for the JKKN "Career Guidance Roadshow 2026" landing page.
 *
 * Tamil ("ta") is the PRIMARY language; English ("en") is the secondary toggle.
 * Tamil strings are mined from doc/context.md (the finished HTML invitation) so
 * the wording matches the event's existing voice.
 *
 * `Language` is re-exported from lib/leads.ts so the dictionary keys and the
 * frozen data contract stay in lockstep (ta | en).
 */
import type { Language } from "./leads";

export type { Language };

/** Shape of one language's copy. Both `ta` and `en` must satisfy this. */
export interface Dictionary {
  /** Language toggle labels (shown on the segmented control). */
  toggle: {
    ta: string;
    en: string;
    /** Accessible label for the toggle group. */
    aria: string;
  };
  /** Organising bodies shown as badges. */
  orgs: {
    jkkn: string;
    cdc: string;
    yi: string;
  };
  hero: {
    /** Small kicker line above the title. */
    eventType: string;
    /** Main title (rendered around an accent <span>). */
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    /** English sub-title under the Tamil title. */
    subtitle: string;
    /** Primary call-to-action that scrolls to the registration form. */
    cta: string;
    /** Scroll-cue label at the foot of the hero. */
    scroll: string;
  };
  who: {
    label: string;
    text: string;
  };
  topics: {
    label: string;
    items: { icon: string; text: string }[];
  };
  details: {
    /** Section heading for the event-details block. */
    heading: string;
    date: { label: string; value: string; note: string };
    time: { label: string; value: string; note: string };
    venue: { label: string; value: string; note: string };
  };
  contact: {
    label: string;
    email: string;
  };
  /** Boarding-pass "ticket" stub copy on the event-details section. */
  ticket: {
    admit: string;
    free: string;
  };
  closing: {
    welcomeLead: string;
    welcomeAccent: string;
    signOffLead: string;
    signOffOrg: string;
  };
  form: {
    /** Section heading + intro for the lead-capture form. */
    heading: string;
    intro: string;
    fields: {
      name: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      course: { label: string; placeholder: string };
      plusTwoGroup: { label: string; placeholder: string };
      plusTwoGroupOther: { placeholder: string };
      parentPhone: { label: string; placeholder: string };
    };
    /** Parent-phone "Skip" toggle copy. */
    skipParent: string;
    optional: string;
    submit: string;
    submitting: string;
    /** Inline validation messages, keyed loosely to fields. */
    errors: {
      name: string;
      phone: string;
      course: string;
      plusTwoGroup: string;
      parentPhone: string;
      generic: string;
    };
    success: {
      title: string;
      body: string;
    };
  };
}

const ta: Dictionary = {
  toggle: {
    ta: "தமிழ்",
    en: "English",
    aria: "மொழியை மாற்று",
  },
  orgs: {
    jkkn: "JKKN Institutions",
    cdc: "CDC",
    yi: "Yi – Young Indians",
  },
  hero: {
    eventType: "அன்புடன் அழைக்கிறோம்",
    titleLead: "உயர்கல்வி & தொழில் ",
    titleAccent: "வழிகாட்டல்",
    titleTail: " பயிற்சி முகாம்",
    subtitle: "Career Guidance Workshop 2026",
    cta: "இடத்தை பதிவு செய்யுங்கள்",
    scroll: "கீழே",
  },
  who: {
    label: "யாருக்கு?",
    text: "12-ம் வகுப்பு தேர்ச்சி பெற்ற மாணவர்கள் மற்றும் அவர்களது பெற்றோர்களுக்கு — எடப்பாடி மற்றும் சுற்றுவட்டார பகுதிகளிலிருந்து.",
  },
  topics: {
    label: "நிகழ்வில் பேசப்படும் தலைப்புகள்",
    items: [
      { icon: "🎓", text: "தமிழ்நாடு கல்லூரி சேர்க்கை வழிகாட்டுதல்" },
      { icon: "📚", text: "சரியான பாடப்பிரிவு தேர்வு" },
      { icon: "🤖", text: "AI சார்ந்த எதிர்கால தொழில் வாய்ப்புகள்" },
    ],
  },
  details: {
    heading: "நிகழ்வு விவரங்கள்",
    date: { label: "நாள்", value: "12 ஜூன் 2026", note: "Friday" },
    time: { label: "நேரம்", value: "காலை 10:30", note: "10:30 AM onwards" },
    venue: { label: "இடம்", value: "எடப்பாடி", note: "Community Hall" },
  },
  contact: {
    label: "தொடர்புக்கு / For Enquiries",
    email: "ceo.office@jkkn.ac.in",
  },
  ticket: {
    admit: "நுழைவு அனுமதி",
    free: "இலவச நுழைவு",
  },
  closing: {
    welcomeLead: "உங்கள் வருகையை ",
    welcomeAccent: "எதிர்பார்க்கிறோம்!",
    signOffLead: "நன்றியுடன்,",
    signOffOrg: "நிர்வாகம், JKKN Institutions · CDC · Yi",
  },
  form: {
    heading: "உங்கள் இடத்தை பதிவு செய்யுங்கள்",
    intro: "கீழே உள்ள விவரங்களை நிரப்பவும் — நிகழ்வு குறித்த அறிவிப்புகளை உங்களுக்கு அனுப்புவோம்.",
    fields: {
      name: { label: "மாணவர் பெயர்", placeholder: "உங்கள் முழுப் பெயர்" },
      phone: { label: "கைபேசி எண்", placeholder: "10 இலக்க கைபேசி எண்" },
      course: { label: "ஆர்வமுள்ள படிப்பு", placeholder: "நீங்கள் ஆர்வமாக உள்ள படிப்பை உள்ளிடவும்" },
      plusTwoGroup: { label: "+2 பிரிவு", placeholder: "உங்கள் +2 பிரிவைத் தேர்ந்தெடுக்கவும்" },
      plusTwoGroupOther: { placeholder: "உங்கள் +2 பிரிவை உள்ளிடவும்" },
      parentPhone: { label: "பெற்றோர் கைபேசி எண்", placeholder: "10 இலக்க கைபேசி எண்" },
    },
    skipParent: "பெற்றோர் எண்ணைத் தவிர்க்கவும்",
    optional: "விருப்பத்தேர்வு",
    submit: "பதிவு செய்யுங்கள்",
    submitting: "பதிவு செய்கிறோம்…",
    errors: {
      name: "உங்கள் பெயரை உள்ளிடவும்.",
      phone: "சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்.",
      course: "ஒரு படிப்பைத் தேர்ந்தெடுக்கவும்.",
      plusTwoGroup: "உங்கள் +2 பிரிவைத் தேர்ந்தெடுக்கவும்.",
      parentPhone: "சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்.",
      generic: "ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.",
    },
    success: {
      title: "நன்றி! உங்கள் பதிவு பெறப்பட்டது.",
      body: "12 ஜூன் 2026 அன்று எடப்பாடி சமூக மண்டபத்தில் உங்களை சந்திப்போம். நிகழ்வு குறித்த விவரங்களை விரைவில் அனுப்புவோம்.",
    },
  },
};

const en: Dictionary = {
  toggle: {
    ta: "தமிழ்",
    en: "English",
    aria: "Change language",
  },
  orgs: {
    jkkn: "JKKN Institutions",
    cdc: "CDC",
    yi: "Yi – Young Indians",
  },
  hero: {
    eventType: "You're warmly invited",
    titleLead: "Career ",
    titleAccent: "Guidance",
    titleTail: " Workshop",
    subtitle: "Career Guidance Workshop 2026",
    cta: "Reserve your seat",
    scroll: "Scroll",
  },
  who: {
    label: "Who is it for?",
    text: "Students who have completed Class 12 and their parents — from Edappadi and the surrounding region.",
  },
  topics: {
    label: "What we'll cover",
    items: [
      { icon: "🎓", text: "Tamil Nadu college admission guidance" },
      { icon: "📚", text: "Choosing the right course" },
      { icon: "🤖", text: "AI-driven future career opportunities" },
    ],
  },
  details: {
    heading: "Event details",
    date: { label: "Date", value: "12 June 2026", note: "Friday" },
    time: { label: "Time", value: "10:30 AM", note: "10:30 AM onwards" },
    venue: { label: "Venue", value: "Edappadi", note: "Community Hall" },
  },
  contact: {
    label: "For Enquiries / தொடர்புக்கு",
    email: "ceo.office@jkkn.ac.in",
  },
  ticket: {
    admit: "ADMIT ONE",
    free: "FREE ENTRY",
  },
  closing: {
    welcomeLead: "We look forward to ",
    welcomeAccent: "welcoming you!",
    signOffLead: "With gratitude,",
    signOffOrg: "Management, JKKN Institutions · CDC · Yi",
  },
  form: {
    heading: "Reserve your seat",
    intro: "Fill in the details below — we'll send you updates about the event.",
    fields: {
      name: { label: "Student name", placeholder: "Your full name" },
      phone: { label: "Mobile number", placeholder: "10-digit mobile number" },
      course: { label: "Course of interest", placeholder: "Type the course you're interested in" },
      plusTwoGroup: { label: "+2 group", placeholder: "Select your +2 group" },
      plusTwoGroupOther: { placeholder: "Type your +2 group" },
      parentPhone: { label: "Parent's mobile number", placeholder: "10-digit mobile number" },
    },
    skipParent: "Skip parent's number",
    optional: "Optional",
    submit: "Register",
    submitting: "Registering…",
    errors: {
      name: "Please enter your name.",
      phone: "Enter a valid 10-digit Indian mobile number.",
      course: "Please select a course.",
      plusTwoGroup: "Please select your +2 group.",
      parentPhone: "Enter a valid 10-digit Indian mobile number.",
      generic: "Something went wrong. Please try again.",
    },
    success: {
      title: "Thank you! Your registration is in.",
      body: "We'll see you on 12 June 2026 at the Edappadi Community Hall. Event details will follow shortly.",
    },
  },
};

/** Typed dictionary keyed by language. */
export const dict: Record<Language, Dictionary> = { ta, en };
