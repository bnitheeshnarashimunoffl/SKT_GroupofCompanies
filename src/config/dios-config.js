/**
 * SKT Translines — Dios Config
 * 
 * ALL site content lives here. Zero hardcoding in components.
 * Components must source all data from this config.
 */

export const siteConfig = {
  // ── SEO & Metadata ──────────────────────────────────────────────────
  seo: {
    title: "SKT — Sree Keerthi Group / Driving India's Logistics",
    description: "India's trusted logistics powerhouse since 2014 — transportation, warehousing, and C&F agency across 27 branches nationwide.",
    canonical: "https://skttranslines.com",
    ogImage: "/assets/og-image.jpg",
    themeColor: "#eaeaef"
  },

  // ── Hero Section ────────────────────────────────────────────────────
  hero: {
    eyebrow: "Est. 2014 · Sree Keerthi Group",
    heading: [
      "Moving India",
      "Forward,",
      "Miles with Smiles."
    ],
    subtext: "From a two-branch startup in Tirupati to a ₹150 Crore pan-India logistics force — Sree Keerthi Group doesn't just deliver freight. We deliver promises. On time, every time, across 27 branches and counting.",
    ctaPrimary: {
      text: "Contact Us",
      href: "#contact"
    },
    ctaSecondary: {
      text: "Our Services",
      href: "#services"
    },
    stats: [
      { value: 27, suffix: "", label: "Branches" },
      { value: 106, suffix: "+", label: "Employees" },
      { value: 150, prefix: "₹", suffix: " Crore", label: "FY25 Revenue" },
      { value: 12, suffix: "+", label: "Years of Operational Excellence" }
    ],
    marqueeClients: [
      "ADANI WILMAR", "EXIDE INDUSTRIES", "ITC LTD. (TM&D)", "SAINT-GOBAIN",
      "MONDELEZ", "EMAMI LTD.", "KAJARIA CERAMICS", "GREENPANEL INDUSTRIES", "GEF INDIA"
    ]
  },

  // ── Credential Strip ────────────────────────────────────────────────
  credentials: [
    {
      icon: "✓",
      title: "Profitable Every Year",
      subtitle: "Since incorporation in 2014"
    },
    {
      icon: "↑",
      title: "₹3.27 Crore → ₹150 Crore",
      subtitle: "Decade of compounding growth"
    },
    {
      icon: "0",
      title: "Zero Claims",
      subtitle: "No non-delivery or short-delivery"
    }
  ],

  // ── About Section ───────────────────────────────────────────────────
  about: {
    heading: [
      "A decade of",
      "relentless growth."
    ],
    image: "/assets/corporate-team.webp",
    imageAlt: "SKT corporate leadership team",
    imageMeta: {
      location: "Maduravoyal, Chennai",
      tag: "SKT Leadership"
    },
    growthTag: {
      value: "Rs. 3.27 Cr → Rs. 150 Cr",
      label: "Year-1 turnover to FY25 revenue"
    },
    paragraphs: [
      "Founded in 2014 with a regional office in Renigunta near the temple town of Tirupati, SKT began with two branches, fifteen people, and a turnover of Rs. 3.27 crores in its first year.",
      "Today, SKT operates from 27 branches criss-crossing India, with a 106-strong team and a recorded FY25 turnover of ₹150 crores — a 45× growth in just over a decade.",
      "Our corporate office sits in the commercial heart of Chennai — KKV Towers, Maduravoyal — from where we orchestrate transportation, warehousing, and C&F operations nationwide."
    ],
    metrics: [
      { value: 27, suffix: "", label: "Branches PAN India" },
      { value: 150, prefix: "₹", suffix: " Crore", label: "FY25 Turnover" },
      { value: 106, suffix: "+", label: "Team Size" }
    ]
  },

  // ── Team Section ────────────────────────────────────────────────────
  team: {
    heading: [
      "The people",
      "behind the wheel."
    ],
    description: "A board built across Finance, Operations, Marketing, EDP and Administration — bringing close to a century of combined experience to every shipment.",
    members: [
      {
        id: "v-devaraj",
        number: "01",
        name: "Mr. V. Devaraj",
        designation: "Chairman & Managing Director",
        experience: "40+",
        photo: "/assets/devaraj.webp",
        bio: [
          "The founder of the company has to his credit more than 42 years of experience in the transportation industry, of which 30 years was in A.S. Transport Pvt. Ltd. — a company with a recorded turnover of Rs. 250 Crore. He has built excellent relationships with top-notch companies and is instrumental in steering SKT through all straits. Under his astute leadership, able guidance and sanguine stewardship, the company has scaled great heights. From a small speck of Rs. 3.27 Crore in the year 2014, the company achieved a turnover of Rs. 36 Crore as on 31/03/2017 and projected to reach Rs. 100 Crore by 2020.",
          "With his characteristic leadership skills, Mr. Devaraj has taken the company to newer heights, even as he is the recipient of the prestigious Transporter Rolling Trophy by ARBL consecutively for 3 years. His business foresight, strategic planning, combined with excellent administrative acumen and profound understanding of road transport operations, have steered the organisation against all straits and made it grow to a position of importance in the industry.",
          "Mr. Devaraj is also the President of the Local Union of Renigunta Tirupati Balaji Lorry Owners Association, whose members supply trucks to all the factories in and around Renigunta, Tirupati, Krishnapatnam, Gudur, Nayudupet and Chittoor."
        ]
      },
      {
        id: "r-balaji",
        number: "02",
        name: "Mr. R. Balaji",
        designation: "Director",
        experience: "30+",
        photo: "/assets/balaji.webp",
        bio: [
          "Possessing around 32 years of experience in the transportation industry, Mr. R. Balaji was inducted as an additional Partner in July 2015 to step up the Key Management Portfolio. He was previously associated with AST as Assistant General Manager (Marketing) since 2001, gaining excellent and varied experience across Finance, Marketing, Operations and Administration during his 15-year tenure.",
          "His extraordinary skill in displaying persuasive proclivities — so essential in a competitive atmosphere — has been instrumental not only in raising revenue but also in reviving SKT's association with high-profile customers."
        ]
      },
      {
        id: "kv-shiva-rao",
        number: "03",
        name: "Mr. K.V. Shiva Rao",
        designation: "Core Management",
        experience: "40+",
        photo: "/assets/shivarao.webp",
        bio: [
          "The company's splendid performance is also attributable to the unstinted support it derived from ex-banker Mr. K.V. Shiva Rao of Union Bank of India, who has been associated with the company from its inception. His prompt attendance to the various needs of customers at all points of time has made the company a highly dependable one for the services entrusted to it.",
          "The phenomenal growth the company has registered within a few years of its formation can be attributed to Mr. K.V. Shiva Rao, who has built and managed a comprehensive clientele of consequence to boost the profitability of the company. He is also enriched with three decades of experience at AST.",
          "The financial needs and working capital structuring that are sine qua non for the success of this logistics enterprise were made possible through the efficient service rendered by Mr. K.V. Shiva Rao, who was instrumental in carving a niche for the company in the field of transportation."
        ]
      },
      {
        id: "n-sudhakar",
        number: "04",
        name: "Mr. N. Sudhakar",
        designation: "Chief Executive",
        experience: "25+",
        photo: "/assets/sudhakar.webp",
        bio: [
          "Possessing around 27 years of experience in the transportation industry, Mr. Sudhakar has been a key person in discharging duties alongside Mr. V. Devaraj in AST, and even after the floating of SKT, he continues to perform a key role in managing the day-to-day activities of the erstwhile AST Company.",
          "His dynamic approach and practical wisdom has brought bumper profits during the last decade. Being an adept in carrying out inspections, he was instrumental in plugging loop-holes that allowed leakages of revenue. He introduced an internal control system, strengthened the inspection and internal audit departments, and established a system of close monitoring of the movement of funds and vehicles."
        ]
      },
    ]
  },

  // ── Services Section ────────────────────────────────────────────────
  services: {
    heading: [
      "Three services.",
      "One operating standard."
    ],
    description: "Road transportation is the core. Warehousing and C&F agency extend the chain — end-to-end coverage from pickup to last-mile.",
    items: [
      {
        index: "01",
        icon: "truck",
        title: "Road Transportation",
        description: "Contract-rate operations with prompt and consistent truck placement, large-volume consignment handling, and live tracking visibility — the operational backbone of SKT."
      },
      {
        index: "02",
        icon: "warehouse",
        title: "Warehousing",
        description: "Strategically located, modern warehousing facilities engineered for safe storage, inventory accuracy, and efficient onward distribution across the country."
      },
      {
        index: "03",
        icon: "box",
        title: "C&F Agency",
        description: "A growing C&F practice expanding into new industries and territories. Field teams continuously scouting fresh corridors, opening new revenue lines."
      }
    ],
    featured: [
      {
        tag: "★ Featured Partnership",
        title: "Dedicated C & F for Adani Wilmar — since Nov 2019.",
        description: "Adani Wilmar Ltd. awarded SKT its C&F agency out of Tirupati in November 2019 which is now operating from Kadapa. Five-plus years later, the partnership runs ahead of expectation — a testament to operational reliability that compounds over time."
      },
      {
        tag: "★ Featured Partnership",
        title: "Dedicated C & F for Gemini Edibles and Fats.",
        description: "Carried out by SKT in Hyderabad."
      }
    ]
  },

  // ── Clients Section ─────────────────────────────────────────────────
  clients: {
    heading: [
      "India's leading",
      "brands. On the road."
    ],
    items: [
      { name: "ADANI WILMAR", category: "FMCG · Edible Oils", url: "https://www.awl.in/" },
      { name: "EXIDE INDUSTRIES", category: "Industrial Batteries", url: "https://www.exideindustries.com" },
      { name: "ITC LTD. (TM&D)", category: "FMCG Distribution", url: "https://www.itcportal.com/businesses/fmcg/trade-marketing-distribution.aspx" },
      { name: "SAINT-GOBAIN", category: "Materials", url: "https://www.saint-gobain.co.in" },
      { name: "MONDELEZ (FORMERLY CADBURY)", category: "Confectionery", url: "https://www.mondelezinternational.com/our-brands/cadbury/" },
      { name: "EMAMI LTD.", category: "Personal Care", url: "https://www.emamiltd.in" },
      { name: "KAJARIA CERAMICS", category: "Ceramics", url: "https://www.kajariaceramics.com" },
      { name: "GREENPANEL INDUSTRIES", category: "Wood Panels", url: "https://www.greenpanel.com" },
      { name: "GEF INDIA", category: "Industrial Packaging", url: "https://www.greif.com" }
    ]
  },

  // ── Milestones Section ──────────────────────────────────────────────
  milestones: {
    heading: [
      "Twelve reasons",
      "we keep moving."
    ],
    items: [
      { number: "01", title: "Committed Management Team", description: "Leadership aligned on a single objective — long-term customer trust and operational excellence." },
      { number: "02", title: "Good Labour Relations", description: "A harmonious workforce built on fairness, trust and mutual respect at every level." },
      { number: "03", title: "Outstanding Credit Rating", description: "Financial discipline that translates into uninterrupted operational capacity." },
      { number: "04", title: "Good Public Image", description: "A reputation earned consignment by consignment — recognised across the industry." },
      { number: "05", title: "Strategic Location", description: "Twenty-seven branches positioned to connect key industrial corridors across India." },
      { number: "06", title: "Excellent Reputation for Reliability", description: "Built on a clean, consistent record of on-time, intact delivery — no exceptions." },
      { number: "07", title: "Number of Service Locations", description: "A growing pan-India network giving customers reach without the operational burden." },
      { number: "08", title: "Competitive Contractual Agreements", description: "Structured, transparent contracts that deliver value for customers and partners alike." },
      { number: "09", title: "Established Elite Customer Base", description: "A portfolio of high-profile, long-standing customers who trust SKT with their supply chains." },
      { number: "10", title: "Dedicated & Diligent Workforce", description: "One hundred and six professionals turning logistics complexity into shipped freight, every day." },
      { number: "11", title: "Favourable Customer Attitudes", description: "Positive relationships generated by sincere service — the foundation of every repeat engagement." },
      { number: "12", title: "Future-Ready DNA", description: "While others look back, SKT builds forward — investing in real-time fleet intelligence, digital freight corridors, and scalable infrastructure to dominate the next decade of Indian logistics." }
    ]
  },

  // ── Branches Section ────────────────────────────────────────────────
  branches: {
    heading: [
      "Twenty-six branches.",
      "One network."
    ],
    description: "Tap any branch to see what it covers and who it serves.",
    regions: {
      south: {
        name: "South",
        count: "19 Branches",
        branches: [
          {
            tag: "REG",
            name: "Registered Office — Renigunta, Tirupati",
            address: "17/28/14-1, New Byepass Circle, Renigunta – 517 520, Chittoor District, Andhra Pradesh.",
            email: "sktdevaraj@gmail.com, sreekeerthitransport@gmail.com",
            representatives: [
              { name: "Mr. V. Devaraj", phones: ["09849494588", "09398163131"] },
              { name: "Mr. N. Sudhakar", phones: ["9966860065"] }
            ]
          },
          {
            tag: "CO",
            name: "Corporate Office — Chennai",
            address: "K.K.V. Towers, I Floor, No. 3, Chokkanathar Street, Karthikeyan Nagar, Maduravoyal, Chennai – 600 095, Tamil Nadu.",
            email: "sktdevaraj@gmail.com, balaji@sktransport.co.in, sktmadras@gmail.com, shivarao@sktransport.co.in",
            representatives: [
              { name: "Mr. V. Devaraj", role: "Managing Director", phones: ["9849494588"] },
              { name: "Mr. R. Balaji", role: "Director", phones: ["9962846873"] },
              { name: "Mr. K.V. Shiva Rao", role: "CEO", phones: ["9382830333"] }
            ]
          },
          {
            name: "Chennai — Main",
            address: "KKV Towers, Door No. 3, II Floor, Chokkanathar Street, Karthikeyan Nagar, Maduravoyal, Chennai – 600 095, Tamil Nadu.",
            email: "sktchennaimain@gmail.com",
            representatives: [
              { name: "Mr. P. Vinod Kumar", phones: ["7601004702"] }
            ]
          },
          {
            name: "Chennai — Redhills",
            address: "AWL Agri Business Ltd, No. 126, Budur Village, Ponneri Taluk, Sholavaram Panchayat, Tiruvallur Dist., Chennai – 600 067, Tamil Nadu.",
            email: "sktredhills@gmail.com",
            representatives: [
              { name: "Mr. T. Jagadees", phones: ["9786661416"] },
              { name: "Mr. Kumaresan", role: "COO", phones: ["9840860384"] },
              { name: "Mr. Mohideen Bawa", phones: ["8056182425"] }
            ]
          },
          {
            name: "Hyderabad",
            address: "H.No. 2-1-64, Plot No. 162, Laxma Reddy Colony, Beside Siddi Vinayaka Bike Point Lane, Uppal Roads, Hyderabad, Telangana – 500 039.",
            email: "skthyderabad@gmail.com",
            representatives: [
              { name: "Mr. M. Sarath Babu", role: "Branch Manager", phones: ["8978522587"] },
              { name: "Mr. T. Srinivas", phones: ["9393937570"] },
              { name: "Mr. Sravan", phones: ["8885478797"] }
            ]
          },
          {
            name: "Kakinada",
            address: "H.No. 16-23-47/A, Sambamurthy Nagar, Dairy Farm Center, Backside Water Tank, Kakinada – 533 003, Andhra Pradesh.",
            email: "sktallbranches@gmail.com",
            representatives: [
              { name: "Mr. Vinay", role: "Branch Manager", phones: ["9908233644"] }
            ]
          },
          {
            name: "Nellore",
            address: "BC Colony, Ground Floor, Shop No. 1, Muthukur Village & Mandal, SPSR Nellore Dist., AP – 524 344.",
            email: "sktnellore1@gmail.com",
            representatives: [
              { name: "Mr. G. Balaji", role: "Sr. Branch Manager", phones: ["9502634548", "9010183965"] },
              { name: "Mr. A. Ashok Kumar", role: "Branch Manager", phones: ["9603290838"] }
            ]
          },
          {
            name: "Badvel",
            address: "42-1-A4, Teachers Colony, Beside Nagabhushanam Degree College, Nellore Road, Badvel – 516 277, YSR Kadapa Dist., Andhra Pradesh.",
            email: "sktbadvel@gmail.com",
            representatives: [
              { name: "Mr. Shaik Basha", role: "Branch Manager", phones: ["6303788697"] }
            ]
          },
          {
            name: "Proddatur",
            address: "C&F: Gemini Edibles & Fats India Ltd, Room No. 11, 12, 13 & 14, Guru Sai Complex, Mandi Bazaar Road, Proddatur – 516 360, YSR Kadapa Dist., Andhra Pradesh.",
            email: "sktproddatur@gmail.com",
            representatives: [
              { name: "Mr. M. Varun Kumar", role: "Branch Manager", phones: ["8919756103", "7794885258"] }
            ]
          },
          {
            name: "Kadapa",
            address: "R.S. No. 634/B, Machupalli Road, Ukkayapalli, Kadapa – 516 002.",
            email: "sktcfakadapa@gmail.com",
            representatives: [
              { name: "Mr. B. Mallesh", role: "Branch Manager", phones: ["9676042918"] },
              { name: "Mr. Sankar", phones: ["7793917373"] }
            ]
          },
          {
            name: "Khammam",
            address: "D.No. 3-7-1A, Grain Market Road, Opposite Cotton Market, Khammam – 507 002, Telangana.",
            email: "sktkhammamcfa@gmail.com",
            representatives: [
              { name: "Mr. P. Chandra Sekhar Reddy", role: "Branch Manager", phones: ["8121999686"] }
            ]
          },
          {
            name: "Warangal",
            address: "Survey No. 519/C/1, 520/B/3, GWMC No. 45-7-1307, Pragathi Industrial Area, Gorrekunta Village, Gesugonda Mandal, Narsampet Road, Warangal – 506 002.",
            email: "sktwarangal@gmail.com",
            representatives: [
              { name: "Mr. P. Chandra Sekhar Reddy", role: "Branch Manager", phones: ["8121999686"] }
            ]
          },
          {
            name: "Sarapaka",
            address: "Main Road, Sarapaka, Burgamphad Mandal, Bhadradri Kothagudem Dist., Telangana – 507 128.",
            email: "sktsarapaka@gmail.com",
            representatives: [
              { name: "Mr. Venkat Reddy", role: "Branch Manager", phones: ["9700083335"] }
            ]
          },
          {
            name: "Trichy",
            address: "Door No. 48/112A, Big Sowrashtra Street, Trichy – 620 008, Tamil Nadu.",
            email: "skttrichy@gmail.com",
            representatives: [
              { name: "Mr. A.J. Ramkumar", role: "Branch Manager", phones: ["9597684456"] }
            ]
          },
          {
            name: "Dindigul",
            address: "2nd Floor, 4, Udhayam Colony, R.M. Colony, 2nd Main Road, Near Guru Aalayam, Dindigul – 624 001.",
            email: "gajadgl16@gmail.com",
            representatives: [
              { name: "Mrs. Gajendran", role: "Branch Manager", phones: ["9443393959"] }
            ]
          },
          {
            name: "Ranipet",
            address: "No. 63/1, Sowcar Complex, 1st Floor, Arcot Bye-pass Road (Kannan Mahal Opp.), Ranipet – 632 401, Tamil Nadu.",
            email: "sktranipet2019@gmail.com",
            representatives: [
              { name: "Mr. A. Vinayagam", role: "Branch Manager", phones: ["9500950689"] },
              { name: "Mr. Ramanan", role: "Asst. Manager", phones: ["9500652693"] }
            ]
          },
          {
            name: "Tuticorin",
            address: "Ziva Home, 1/420-5, Mappillaiurani, Tuticorin – 628 002, Tamil Nadu.",
            email: "gajadgl16@gmail.com",
            representatives: [
              { name: "Mr. M. P. Hari", phones: ["9042717597"] }
            ]
          },
          {
            name: "Hosur (Bangalore)",
            address: "No. 12, Dandupalyam Gate, Near Bharat Petrol Bunk, Kolthur Post, Hoskote – 562 114, Bangalore.",
            email: "hosurskt@gmail.com",
            representatives: [
              { name: "Mr. Srinivas", role: "Branch Manager", phones: ["9986484376"] }
            ]
          },
          {
            name: "Coimbatore",
            address: "SF No. 490/1C, Sokkampalayam Road, Near HP Gas Bunk, Annur, Coimbatore, Tamil Nadu – 641 653.",
            email: "coimbatore.gef@gmail.com",
            representatives: [
              { name: "Mrs. Bhuvaneswari", role: "Branch Manager", phones: ["9952580918"] }
            ]
          }
        ]
      },
      north: {
        name: "North",
        count: "4 Branches",
        branches: [
          {
            name: "Bhiwadi",
            address: "Flat No. 3B, I Floor, Rajashree Royal Residency (Trehan), Aravalli Vihar, Sector 3, Housing Board, Near Radha Soami Satsang Bhavan, Bhiwadi – 301 019, Dist. Alwar, Rajasthan.",
            email: "sktbhiwadi@gmail.com",
            representatives: [
              { name: "Mr. Surender Singh", role: "Branch Manager", phones: ["9351478915"] }
            ]
          },
          {
            name: "Ghaziabad",
            address: "B-53, G.T. Karnal Road, Industrial Area, Azadpur near HOD, Delhi – 110 033.",
            email: "sktdelhi16@gmail.com",
            representatives: []
          },
          {
            name: "Sikandrabad",
            address: "Room No. 27, Kartar Singh Compound, G.T. Road, Sanwali, Sikandrabad Dist., Bulandshahar – 203 205, Uttar Pradesh.",
            email: "sktsikandrabad@gmail.com",
            representatives: [
              { name: "Mr. Chandramohan", role: "Branch Manager", phones: ["8081123950"] },
              { name: "Mr. Vinod", role: "Asst. Manager", phones: ["6350550795"] }
            ]
          },
          {
            name: "Jaipur",
            address: "105, 2nd Floor, Sangam Colony, Near Kukarkheda Mandi, VKI Area, Delhi Ajmer Bye Pass, Jaipur – 302 013, Rajasthan.",
            email: "sktjaipur1705@gmail.com",
            representatives: [
              { name: "Mr. Hemant Jaiswal", role: "Branch Manager", phones: ["9660824777"] }
            ]
          }
        ]
      },
      east: {
        name: "East",
        count: "3 Branches",
        branches: [
          {
            name: "Haldia",
            address: "Swapan Kumar Jana (Building), HPL Link Road, Basudevpur Village, P.O. Khanjanchack, Haldia – 721 602, Purba Midnapore, West Bengal.",
            email: "haldia@sktransport.co.in, haldiaskt@gmail.com",
            representatives: [
              { name: "Mr. Achinta Nag", role: "Branch Manager", phones: ["8001234894", "7908875408"] },
              { name: "Mr. Dhirendra Kr. Roy", phones: ["8967602633", "7908261464"] }
            ]
          },
          {
            name: "Kolkata",
            address: "1st Floor, 265, B.B. Ganguly Street, P.S. Bowbazar, Kolkata – 700 012, West Bengal.",
            email: "kolkata@sktransport.co.in",
            representatives: [
              { name: "Mr. Jagabandu Debnath", phones: ["9064957779"] }
            ]
          },
          {
            name: "Patna",
            address: "Jaganath Lodge, No. 5, Post Office Road, Near Sona Apartment, Puniachak, Patna – 800 023, Bihar.",
            email: "",
            representatives: [
              { name: "Mr. Mukesh Kumar Sanu", phones: ["7870782722", "8825150443"] }
            ]
          }
        ]
      }
    }
  },

  // ── Contact Section ─────────────────────────────────────────────────
  contact: {
    heading: [
      "Let's move",
      "together."
    ],
    description: "Ready to streamline your logistics? Get in touch with our team.",
    email: "sktmadras@gmail.com",
    phone: "+91 98494 94588",
    address: "KKV Towers, Maduravoyal, Chennai – 600 095"
  },

  // ── Footer ──────────────────────────────────────────────────────────
  footer: {
    copyright: `© ${new Date().getFullYear()} Sree Keerthi Group Services Pvt. Ltd.`,
    links: [
      { text: "Home", href: "#home" },
      { text: "About", href: "#about" },
      { text: "Services", href: "#services" },
      { text: "Contact", href: "#contact" }
    ]
  }
};

