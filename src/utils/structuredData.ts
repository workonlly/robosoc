// Structured Data schemas for different page types

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RoboSoc NITH",
  "alternateName": "Robotics Society of NIT Hamirpur",
  "url": "https://robosoc-nith.com",
  "logo": "https://robosoc-nith.com/Robosoc logo 1080x1080.png",
  "description": "The premier robotics society of National Institute of Technology Hamirpur, fostering innovation in robotics and technology.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "National Institute of Technology Hamirpur",
    "addressLocality": "Hamirpur",
    "addressRegion": "Himachal Pradesh",
    "postalCode": "177005",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "General Inquiry",
    "email": "robosoc@nith.ac.in"
  },
  "foundingDate": "2015",
  "founders": [
    {
      "@type": "Person",
      "name": "Dr. Kirti Mahajan"
    },
    {
      "@type": "Person", 
      "name": "Kashish Verma"
    },
    {
      "@type": "Person",
      "name": "Late Lamyanba Heisnam"
    }
  ],
  "parentOrganization": {
    "@type": "EducationalOrganization",
    "name": "National Institute of Technology Hamirpur",
    "url": "https://nith.ac.in"
  },
  "sameAs": [
    "https://www.facebook.com/robosoc.nith",
    "https://www.instagram.com/robosoc_nith",
    "https://www.linkedin.com/company/robosoc-nith",
    "https://github.com/robonith"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RoboSoc NITH",
  "url": "https://robosoc-nith.com",
  "description": "Official website of RoboSoc NITH - Robotics Society of NIT Hamirpur",
  "publisher": {
    "@type": "Organization",
    "name": "RoboSoc NITH"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://robosoc-nith.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const createPersonSchema = (person: {
  name: string;
  role: string;
  image?: string;
  description?: string;
  url?: string;
  linkedin?: string;
  github?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.role,
  "description": person.description,
  "image": person.image,
  "url": person.url,
  "worksFor": {
    "@type": "Organization",
    "name": "RoboSoc NITH"
  },
  "sameAs": [
    person.linkedin,
    person.github
  ].filter(Boolean)
});

export const createProjectSchema = (project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  dateCreated?: string;
  programmingLanguage?: string[];
  creator?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": project.name,
  "description": project.description,
  "url": project.url,
  "image": project.image,
  "dateCreated": project.dateCreated,
  "programmingLanguage": project.programmingLanguage,
  "creator": project.creator?.map(name => ({
    "@type": "Person",
    "name": name
  })),
  "publisher": {
    "@type": "Organization",
    "name": "RoboSoc NITH"
  },
  "applicationCategory": "Robotics Software"
});

export const createEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  organizer?: string;
  url?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.name,
  "description": event.description,
  "startDate": event.startDate,
  "endDate": event.endDate,
  "location": {
    "@type": "Place",
    "name": event.location || "NIT Hamirpur"
  },
  "organizer": {
    "@type": "Organization",
    "name": event.organizer || "RoboSoc NITH"
  },
  "url": event.url
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
