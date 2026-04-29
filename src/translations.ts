export type Language = "is" | "en";
export type Page = "home" | "knowledge" | "experience" | "references" | "webTools";

export type Translations = {
  nav: {
    home: string;
    knowledge: string;
    experience: string;
    references: string;
    webTools: string;
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
    quotes: string;
  };
  webTools: {
    title: string;
    regexTester: string;
    jsonValidator: string;
    dateParser: string;
    linqDemo: string;
    regexMatches: string;
    regexError: string;
    regexButton: string;
    jsonButton: string;
    dateButton: string;
    dateError: string;
    linqButton: string;
    linqError: string;
    jsonSucsess: string;
    jsonError: string;
    jsonSchemaError: string;
    jsonFormatSchema: string;
    jsonFormatJson: string;
    regexGenerator: string;
    regexGeneratorError: string;
    regexGeneratorButton: string;
    regexGeneratorResult: string;
    regexGeneratorCopy: string;
    regexGeneratorInstruction: string;
  };
};

export const translations: Record<Language, Translations> = {
  is: {
    nav: {
      home: "Forsíða",
      knowledge: "Þekking",
      experience: "Starfsreynsla",
      references: "Meðmælendur",
      webTools: "Vef verkfæri",
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
        "2003 Nýi Tölvu- og viðskiptaskólinn, diplóma í MCP (Microsoft Certified Professional) og MCSE (Microsoft Certified Systems Engineer)",
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
            "Starfaði við þróun á kerfi og hliðarkerfum sem snúa að hugbúnaðarþróun á spurningalistum fyrir fyrirtæki til að kanna ánægju starfmanna. Tímabundið verkefni. Hugbúnaðarþróun í Agiel framenda og .NET Core bakenda. PostgreSQL og Entity Framework",
        },
        {
          heading: "One Systems 2017 - 2025",
          paragraph: "Starfaði við OneCRM og innri og ytri gáttum tengdum því kerfi, ásamt þróun og viðhaldi á Microsoft Graph tengingum, undirritun skjala og innskráningu með Auðkenni og island.is.",
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
            "Auk annarra almennra eða sérsmíðaðra verkefna.",
          ],
        },
        {
          heading: "LS Retail 2015 - 2017",
          paragraph:
            "Retail systems.",
          bullets: [
            "Þróun á POS (Point of Sale) kerfi, bæði LSFirst sem er WinForms kerfi skrifað í C# og þróun á nýjum MPOS sem er Metro app skrifað í HTML með TypeScript.",
            "Bakenda forritun í AX Dynamics og rekstur þessarra kerfa.",
            "Stærsta innleiðing POS kerfa í heiminum í samstarfi við Microsoft fyrir AAFES (hluti af Bandaríska hernum), ásamt þróun MPOS fyrir Jet bensínstöðvar í Evrópu og Cracker Barrel sem er veitingahúsakeðja í Bandaríkjunum.",
            "Meðal verkefna var einnig tryggingakerfi skrifað inn í AX Dynamics í X++ og vefsíða í MVC .NET sem notaði auðkenningu frá Íslandslykli. Kerfið sótti efni beint í AX og vistaði með RTS þjónustu.",
          ],
        },
        {
          heading: "Five Degrees 2014 - 2016",
          paragraph: "Starfaði að þróun fjármálalausna hjá Five Degrees með áherslu á vef- og samþættingarlausnir fyrir banka- og fjármálafyrirtæki.",
          bullets: [
            "Þróaði net- og þjónustuhliðarkerfi fyrir fjármálageirann.",
            "Forritari bæði í Winforms banka bakenda client, auk þess að starfa við vefútgáfu að Clientinum.",
            "Hannað og samþætt kerfi fyrir greiðslur, lán og notendastjórnun.",
            "MVC, .NET umhverfi og vann helst við framenda vefviðmót. Í því felst líka forritun í millilagi og gagnagrunni.",
          ],
        },
        {
          heading: "Íslandspóstur 2011 - 2014",
          paragraph: "Unnið hjá Íslandspósti við þróun og rekstur innri kerfa, netumsjón og gagnagrunnslausna sem þjónuðu póstflutningi og starfsmannavinnu.",
          bullets: [
            "Forritun á innanhúsverkfærum í .NET, C# WinForms og WebForms, JavaScript, jQuery og vefþjónustur, Java JSP og gagnagrunna MS SQL.",
            "Aðstoð við þróun aðalvefs Íslandspósts aðallega í CXXL eða Umbraco netumsjónarkerfum.",
            "Umsjón á nokkrum aðkeyptum eða open source vefum eins og actiTIME og OpenText Content Server, IIS auk Windows og Linux netþjóna.",
            "Hönnun á gagnagrunni yfir öll póstföng á Íslandi, verkfæri á vef til að skrá eða breyta skráningum í grunninn, auk annarra aðgerða sem starfsmenn notuðu til að vinna sína vinnu, þar á meðal staðfesting á launatölum (sem krafðist aðgangsstýringar í Active Directory).",
            "Hjálpartæki fyrir stöðvastjóra til að breyta leiðum bréfbera.",
            "Hjálpartæki fyrir stöðvastjóra til að skrá póstsendingar í SAP þar sem SAP nýtur ekki við.",
            "Gæðahandbók sem notaði vefþjónustur í Livelink gagnaþjónum.",
            "Hönnun og forritun verkfæris sem skannar reikninga og flytur inn í bókhaldskerfið SAP.",
            "Verkfæri fyrir skönnun pósts almennings fyrir Epóst (Mappan). Verkfærið skannaði strikamerki sem flokkunarvélin prentaði á umslögin til að finna réttan einstakling, þjappaði bréfum saman í zip skrá og sendi með FTP með öruggum netsamskiptum.",
            "Verkfæri sem tók við reikningum og greiðsluseðlum frá Epóst til að strikamerkja eða OMR merkja skjöl fyrir pökkunarvél, svo réttur pappír færi í sama umslag þegar hann var prentaður.",
          ],
        },
      ],
    },
    references: {
      title: "Meðmælendur",
      quotes: "Tilvitnanir",
    },
    webTools: {
      title: "Vef verkfæri",
      regexTester: "Regex prófari",
      jsonValidator: "JSON schema staðfestir",
      dateParser: "Dagsetninga þáttari",
      linqDemo: "LINQ sýnidæmi",
      regexMatches: "Niðurstöður",
      regexError: "Engar samsvörun fundust.",
      regexButton: "Keyra próf",
      jsonButton: "Staðfesta JSON",
      dateButton: "Framkvæma dagsetningu",
      linqError: "Ógilt LINQ fyrirspurn.",
      dateError: "Ógilt dagsetningarformat.",
      linqButton: "Keyra",
      jsonSucsess: "✅ JSON er gilt í samræmi við schema.",
      jsonError: "❌ Staðfesting mistókst:\n",
      jsonSchemaError: "❌ Villa í JSON schema:\n",
      jsonFormatSchema: "Formata schema",
      jsonFormatJson: "Formata JSON",
      regexGenerator: "Utbúa regex",
      regexGeneratorError: "❌ Villa: ",
      regexGeneratorButton: "Keyra",
      regexGeneratorResult: "Niðurstaða",
      regexGeneratorCopy: "Afrita",
      regexGeneratorInstruction: "Afritaðu texta sem þú vilt búa til regex fyrir veldu textan sem þú villt finna",
    },
  },
  en: {
    nav: {
      home: "Home",
      knowledge: "Knowledge",
      experience: "Experience",
      references: "References",
      webTools: "Web Tools",
    },
    home: {
      personalTitle: "Personal Information",
      phone: "Phone: +354 611 4748",
      email: "Email: joh@mi.is",
      summaryTitle: "Summary",
      summaryText:
        "Senior Full-Stack software development specialist with over 15 years of experience building scalable .NET solutions. Expertise in backend development, REST API design, databases, and web solutions. Strong interest in AI, automation, and smart solutions.",
      downloadCvIs: "CV in Icelandic",
      downloadCvEn: "CV in English",
      linkedIn: "LinkedIn",
    },
    knowledge: {
      educationTitle: "Education",
      educationItems: [
        "2009 University of Reykjavík, B.Sc. in Computer Science",
        "2007 University of Reykjavík, Systems Engineering",
        "2003 New Computer and Business School, diploma in MCP (Microsoft Certified Professional) and MCSE (Microsoft Certified Systems Engineer)",
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
          paragraph: "Worked on OneCRM and internal/external portals connected to that system, along with development and maintenance of Microsoft Graph integrations, document signing, and login using Auðkenni and island.is.",
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
        {
          heading: "Five Degrees 2014 - 2016",
          paragraph: "Worked on financial software and integration solutions at Five Degrees, focusing on web and service platforms for banking and finance clients.",
          bullets: [
            "Developed web and service-based financial systems.",
            "Worked with TypeScript and frontend web applications.",
            "Designed and integrated solutions for payments, loans, and user management.",
            "Supported customers and ensured system stability.",
          ],
        },
        {
          heading: "Íslandspóstur 2011 - 2014",
          paragraph: "Worked at Íslandspóstur on internal systems, web management, and database solutions supporting mail operations and employee workflows.",
          bullets: [
            "Developed internal tools in .NET, C# WinForms and WebForms, JavaScript, jQuery, web services, Java JSP, and MS SQL databases.",
            "Supported the main Íslandspóstur website development mainly in CXXL or Umbraco content management systems.",
            "Managed several purchased and open-source websites such as actiTIME and OpenText Content Server, plus IIS and Windows/Linux servers.",
            "Designed a nationwide postal address database and web tools to register or update entries, including employee tools for payroll verification requiring Active Directory access control.",
            "Built support tools for station managers to modify mail carrier routes.",
            "Built tools for station managers to register postal shipments in SAP where SAP was not directly supported.",
            "Created a quality manual using web services on Livelink data servers.",
            "Designed and implemented a tool to scan invoices and import them into the SAP accounting system.",
            "Developed a mail scanning tool for public mail for Epost (Mappan), scanning envelope barcodes to identify recipients, compressing processed mail into zip files, and sending them over secure FTP.",
            "Built a tool to receive invoices and payment slips from Epost and barcode/OMR-mark them for packaging machines so the correct paper ended up in the matching envelope after printing.",
          ],
        },
      ],
    },
    references: {
      title: "References",
      quotes: "Quotes",
    },
    webTools: {
      title: "Web Tools",
      regexTester: "Regex Tester",
      jsonValidator: "JSON Schema Validator",
      dateParser: "Date Parser",
      linqDemo: "LINQ Demo",
      regexMatches: "Matches",
      regexError: "No matches found.",
      regexButton: "Run Test",
      jsonButton: "Validate JSON",
      dateButton: "Parse Date",
      dateError: "Invalid date format.",
      linqButton: "Run",
      linqError: "Invalid LINQ query.",
      jsonSucsess: "✅ JSON is valid according to the schema.",
      jsonError: "❌ Validation failed:\n",
      jsonSchemaError: "❌ Error in JSON schema:\n",
      jsonFormatSchema: "Format Schema",
      jsonFormatJson: "Format JSON",
      regexGenerator: "Generate Regex",
      regexGeneratorError: "❌ Error: ",
      regexGeneratorButton: "Run",
      regexGeneratorResult: "Result",
      regexGeneratorCopy: "Copy",
      regexGeneratorInstruction: "Copy the text you want to create a regex for and select the text you want to find",
    },
  },
};