export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTAG;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  try {
    if (typeof window !== "undefined") {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  try {
    if (typeof window !== "undefined") {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {}
};
