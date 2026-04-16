export type Language = "is" | "en";
export type Page = "home" | "knowledge" | "experience" | "references";

export type Translations = {
  nav: {
    home: string;
    knowledge: string;
    experience: string;
    references: string;
  };
  home: {
    personalTitle: string;
    phone: string;
    email: string;
    summaryTitle: string;
    summaryText: string;
    downloadCvIs: string;
    downloadCvEn: string;
    linkedIn: string;
  };
  knowledge: {
    educationTitle: string;
    educationItems: string[];
    skillsTitle: string;
    skills: string[];
    summaryText: string;
  };
  experience: {
    title: string;
    roles: Array<{
      heading: string;
      paragraph: string;
      bullets?: string[];
    }>;
  };
  references: {
    title: string;
  };
};

export const translations: Record<Language, Translations> = {
  is: {
    nav: {
      home: "Forsíða",
      knowledge: "Þekking",
      experience: "Starfsreynsla",
      references: "Meðmælendur",
    },
    home: {
      personalTitle: "Persónulegar upplýsingar",
      phone: "Sími: +354 611 4748",
      email: "Email: joh@mi.is",
      summaryTitle: "Samantekt",
      summaryText:
        "Senior Full-Stack hugbúnaðarþróunarsérfræðingur með yfir 15 ára reynslu af þróun skalanlegra .NET lausna. Sérhæfing í bakendaþróun, REST API hönnun, gagnagrunnum og veflausnum. Mikill áhugi á gervigreind, sjálfvirknivæðingu og snjöllum lausnum.",
      downloadCvIs: "Sækja ferilskrá",
      downloadCvEn: "Ferilsskrá á ensku",
      linkedIn: "LinkedIn",
    },
    knowledge: {
      educationTitle: "Menntun",
      educationItems: [
        "2009 Háskólinn í Reykjavík, B.Sc. í Tölvunarfræði",
        "2007 Háskólinn í Reykjavík, Kerfisfræði",
        "2003 Nýi Tölvu- og viðskiptaskólinn, diplóma í MCP (Microsoft Certified Professional)",
        "2001 Fjölbrautaskólinn í Breiðholti, stúdent",
      ],
      skillsTitle: "Hæfni",
      skills: [".NET / C#", "React", "SQL", "Azure"],
      summaryText:
        "C#, .NET Core, ASP.NET, REST APIs, Entity Framework, MS SQL Server, PostgreSQL, JavaScript, TypeScript, HTML, CSS, Angular, React, Microsoft Graph API, Google Cloud APIs, Azure AD, Agile/Scrum",
    },
    experience: {
      title: "Starfsreynsla",
      roles: [
        {
          heading: "Huxun - CEO 2025 - 2026",
          paragraph:
            "Starfaði við þróun á kerfi og hliðarkerfum sem snúa að hugbúnaðar þróun á spurningalistum fyrir fyrirtæki til að kanna ánæju starfmanna. Tímabundir verkefni. Hugbúnaðarþróun í Agiel framenda og .NET Core bakenda. PostgreSQL og Entity Framework",
        },
        {
          heading: "One Systems 2017 - 2025",
          paragraph: "CRM, integrations, Microsoft Graph.",
          bullets: [
            "Starfaði við þróun á CRM kerfi og hliðarkerfum sem eru í notkun hjá flestum sveitarfélögum landsins, auk nokkurra stofnanna og annarra fyrirtækja.",
            "Innskráning á vefi með hjálp Auðkennis og island.is.",
            "Undirritanir á PDF skjölum með Auðkenni.",
            "Senda póst (hnipp og afgreiða skjal) með pósthólfi island.is.",
            "MS Graph API til að sækja gögn úr Teams, Outlook, SharePoint og fleirum Microsoft lausnum.",
            "Google Translate API fyrir þýðingar.",
            "Aspose framework fyrir vinnslu og umbreytingar á skjölum.",
            "Þróun á móti Nav/Ax kerfum í gegnum vefþjónustur.",
            "Undirbúning á skilapökkum til vörslu hjá Þjóðskjalasafni.",
            "Greiðslulausnir til að sjá um vefgreiðslur frá notendum.",
            "Auk annara almennra eða sérsmíðaðra verkefna.",
          ],
        },
        {
          heading: "LS Retail 2015 - 2017",
          paragraph:
            "Retail systems.",
          bullets: [
            "Þróun á POS (Point of Sale) kerfi, bæði LSFirst sem er WinForms kerfi skrifað í C# og í nýjum MPOS sem er Metro app skrifað í HTML með TypeScript.",
            "Bakenda forritun í AX Dynamics og rekstur þessara kerfa.",
            "Stærsta innleiðing POS kerfa í heiminum í samstarfi við Microsoft fyrir AAFES (hluti af Bandaríska hernum), ásamt þróun MPOS fyrir Jet bensínstöðvar í Evrópu og Cracker Barrel sem er veitingarhúsakeðja í Bandaríkjunum.",
            "Meðal verkefna var einnig tryggingakerfi skrifað inn í AX Dynamics í X++ og vefsíða í MVC .NET sem notaði auðkenningu frá Íslandslykli. Kerfið sótti efni beint í AX og vistaði með RTS þjónustu.",
          ],
        },
      ],
    },
    references: {
      title: "Meðmælendur",
    },
  },
  en: {
    nav: {
      home: "Home",
      knowledge: "Knowledge",
      experience: "Experience",
      references: "References",
    },
    home: {
      personalTitle: "Personal Information",
      phone: "Phone: +354 611 4748",
      email: "Email: joh@mi.is",
      summaryTitle: "Summary",
      summaryText:
        "Senior Full-Stack software development specialist with over 15 years of experience building scalable .NET solutions. Expertise in backend development, REST API design, databases, and web solutions. Strong interest in AI, automation, and smart solutions.",
      downloadCvIs: "Resume in Icelandic",
      downloadCvEn: "Resume in English",
      linkedIn: "LinkedIn",
    },
    knowledge: {
      educationTitle: "Education",
      educationItems: [
        "2009 University of Reykjavík, B.Sc. in Computer Science",
        "2007 University of Reykjavík, Systems Science",
        "2003 New Computer and Business School, diploma in MCP (Microsoft Certified Professional)",
        "2001 Breiðholt College, high school diploma",
      ],
      skillsTitle: "Skills",
      skills: [".NET / C#", "React", "SQL", "Azure"],
      summaryText:
        "C#, .NET Core, ASP.NET, REST APIs, Entity Framework, MS SQL Server, PostgreSQL, JavaScript, TypeScript, HTML, CSS, Angular, React, Microsoft Graph API, Google Cloud APIs, Azure AD, Agile/Scrum",
    },
    experience: {
      title: "Experience",
      roles: [
        {
          heading: "Huxun - CEO 2025 - 2026",
          paragraph:
            "Worked on software and integration systems focused on survey solutions for companies to measure employee satisfaction. Short-term projects. Software development in Agiel frontend and .NET Core backend. PostgreSQL and Entity Framework.",
        },
        {
          heading: "One Systems 2017 - 2025",
          paragraph: "CRM, integrations, Microsoft Graph.",
          bullets: [
            "Developed CRM systems and integration solutions used by most municipalities in Iceland, as well as several institutions and private companies.",
            "Login on websites using Auðkenni and island.is.",
            "Signed PDF documents with Auðkenni.",
            "Sent mail (hnipp and document processing) using the island.is mailbox.",
            "Used MS Graph API to retrieve data from Teams, Outlook, SharePoint, and other Microsoft services.",
            "Google Translate API for translations.",
            "Aspose framework for document processing and transformation.",
            "Developed integrations against Nav/Ax systems via web services.",
            "Prepared document packages for archival at the National Archives.",
            "Payment solutions for web payments from users.",
            "Additional general and custom projects.",
          ],
        },
        {
          heading: "LS Retail 2015 - 2017",
          paragraph: "Retail systems.",
          bullets: [
            "Developed POS systems, including LSFirst in WinForms with C# and the new MPOS Metro app with HTML and TypeScript.",
            "Backend development in AX Dynamics and operation of those systems.",
            "Delivered the largest POS implementation in the world in collaboration with Microsoft for AAFES (part of the US military), including MPOS for Jet gas stations in Europe and Cracker Barrel restaurants in the US.",
            "Also developed insurance solutions in AX Dynamics with X++ and an MVC .NET website using Íslnadslykil authentication. The system fetched data directly from AX and stored it with RTS services.",
          ],
        },
      ],
    },
    references: {
      title: "References",
    },
  },
};