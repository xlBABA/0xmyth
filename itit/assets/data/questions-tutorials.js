/* ==========================================================================
   questions-tutorials.js
   Question bank for BIC1234 / CC106 — Introduction to Internet Technologies.

   Built from the tutorial sheets and the chapter summary. Where a tutorial
   answer disagreed with the summary, the summary won; where a tutorial
   answer was simply wrong, the correct answer is given here instead.

   Loaded as a plain script (no fetch), so this works from file:// too.
   ========================================================================== */

const TUTORIAL_QUESTIONS = [

  /* ==================================================== CHAPTER 1 ======= */

  {
    id: "c1-01",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Tutorial 1",
    type: "mcq",
    question: "What is the difference between the Internet and the Web?",
    options: [
      "The Internet is the physical network that connects computers; the Web is a way of accessing information over it",
      "The Internet is a collection of web pages; the Web is the cabling that connects them",
      "They are two names for exactly the same thing",
      "The Internet is used by companies; the Web is used by individuals"
    ],
    answer: 0,
    explanation: "The Internet is the physical network that connects millions of computers together globally and allows them to communicate. The World Wide Web is a way of accessing information over the medium of the Internet — a collection of web pages reached through a browser. In short, the Internet is infrastructure and the Web is one of the services running on top of it.",
    keyPoints: [
      "Internet = physical network infrastructure connecting computers globally",
      "Web = a way of accessing information over that network",
      "Web = collection of web pages, reached with a browser",
      "The Web runs on the Internet, not the other way round"
    ]
  },

  {
    id: "c1-02",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Tutorial 1",
    type: "mcq",
    question: "Can you have the Internet without the Web?",
    options: [
      "Yes, but only on a private network, never on a public one",
      "Yes — the Web is only one of several services running over the Internet",
      "No — the Internet is defined by the web pages it carries",
      "No — without HTTP no data can travel at all"
    ],
    answer: 1,
    explanation: "Yes. The Web is only one service among many that run over the Internet. Messaging apps such as WhatsApp, email, file transfer and online gaming all use the Internet without touching the Web at all. The reverse is not true: the Web cannot exist without the Internet, because it would have nothing to travel over.",
    keyPoints: [
      "Yes — the Web is one service among many",
      "Non-web uses: messaging apps, email, FTP, gaming, video calls",
      "You cannot have the Web without the Internet"
    ]
  },

  {
    id: "c1-03",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Summary — Ch 1",
    type: "mcq",
    question: "Which project did the Internet begin with, and in which year?",
    options: [
      "The World Wide Web project, in 1969",
      "The TCP/IP project, in 1991",
      "The ARPANET project, in 1969",
      "The ARPANET project, in 1989"
    ],
    answer: 2,
    explanation: "The Internet began with the ARPANET project in 1969. Do not confuse this with 1989, which is when Sir Tim Berners-Lee invented the World Wide Web — twenty years later, and a different thing entirely.",
    keyPoints: [
      "Internet: ARPANET, 1969",
      "Web: Tim Berners-Lee, 1989",
      "Two different inventions, twenty years apart"
    ]
  },

  {
    id: "c1-04",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Summary — Ch 1",
    type: "mcq",
    question: "Who publishes the standards and guidelines for the Web?",
    options: [
      "The Internet Corporation for Assigned Names and Numbers (ICANN)",
      "The Advanced Research Projects Agency (ARPA)",
      "The Institute of Electrical and Electronics Engineers (IEEE)",
      "The World Wide Web Consortium (W3C)"
    ],
    answer: 3,
    explanation: "The standards and guidelines for the Web are published by the World Wide Web Consortium, the W3C. This is separate from the question of ownership: nobody owns the Internet, but the W3C is the body that sets the Web's standards.",
    keyPoints: [
      "W3C = World Wide Web Consortium",
      "Publishes web standards and guidelines",
      "Setting standards is not the same as owning the Internet"
    ]
  },

  {
    id: "c1-05",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Summary — Ch 1",
    type: "mcq",
    question: "Who owns the Internet?",
    options: [
      "No one owns it — it is mostly funded by private and public IT companies",
      "The World Wide Web Consortium owns and operates it",
      "It is jointly owned by the governments that host its main servers",
      "It is owned by the internet service providers that supply access to it"
    ],
    answer: 0,
    explanation: "No one owns the Internet. It is mostly funded by private and public IT companies, but there is no single owner, no central operator and no authority that could switch it off. The W3C sets web standards but does not own the network.",
    keyPoints: [
      "No single owner",
      "Mostly funded by private and public IT companies",
      "No central authority controls it"
    ]
  },

  {
    id: "c1-06",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Summary — Ch 1",
    type: "mcq",
    question: "What does TCP/IP stand for, and what is it?",
    options: [
      "Text Communication Protocol / Interface Protocol — the rules for displaying text in a browser",
      "Transmission Control Protocol / Internet Protocol — a set of protocols allowing cooperating computers to share resources across a network",
      "Transfer Control Program / Internet Package — software that compresses files before sending them",
      "Transmission Control Protocol / Internet Provider — the contract between a user and their ISP"
    ],
    answer: 1,
    explanation: "TCP/IP stands for Transmission Control Protocol / Internet Protocol. It is a set of protocols developed to allow cooperating computers to share resources across a network, and it is the foundational communication suite of the Internet. TCP handles splitting data into packets and reassembling them reliably; IP handles the addressing — where the data is going.",
    keyPoints: [
      "Transmission Control Protocol / Internet Protocol",
      "A set of protocols for sharing resources across a network",
      "TCP = reliable packet handling; IP = addressing"
    ]
  },

  {
    id: "c1-07",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Summary — Ch 1",
    type: "mcq",
    question: "What is a URL?",
    options: [
      "Uniform Retrieval Language — the language used to query a web server",
      "Universal Resource Layer — the part of TCP/IP that handles addressing",
      "Uniform Resource Locator — the unique address of every web page on the Internet",
      "Universal Reference Link — a bookmark saved inside a web browser"
    ],
    answer: 2,
    explanation: "URL stands for Uniform Resource Locator, and it is the unique address of every web page on the Internet. It expresses both the location and the data type of a resource, generally in the form protocol://address.",
    keyPoints: [
      "Uniform Resource Locator",
      "Unique address of a web page",
      "Form: protocol://address"
    ]
  },

  {
    id: "c1-08",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Summary — Ch 1",
    type: "mcq",
    question: "What is a web browser?",
    options: [
      "A computer program that stores and transmits web documents",
      "The physical connection supplied by an internet service provider",
      "A protocol for exchanging files on the World Wide Web",
      "Application software that allows us to view web pages"
    ],
    answer: 3,
    explanation: "A web browser is application software that allows us to view web pages. Be careful with the distractors: the program that stores and transmits web documents is a web server, the physical connection comes from an ISP, and the protocol for exchanging files is HTTP.",
    keyPoints: [
      "Application software for viewing web pages",
      "Not a server — the server stores and sends the pages",
      "Not a protocol — that is HTTP"
    ]
  },

  {
    id: "c1-09",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Summary — Ch 1",
    type: "mcq",
    question: "Which of the following is NOT listed as a service the Internet provides?",
    options: [
      "Manufacturing computer hardware",
      "Education or e-learning",
      "Digital banking",
      "Social networking"
    ],
    answer: 0,
    explanation: "The services listed are communicating, searching, education or e-learning, online shopping, digital banking and social networking. Manufacturing hardware is a physical industry, not an Internet service — the Internet may support the business, but it is not one of the services it provides.",
    keyPoints: [
      "Six services: communicating, searching, e-learning, online shopping, digital banking, social networking",
      "All are things done over the network, not physical production"
    ]
  },

  {
    id: "c1-10",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Summary — Ch 1",
    type: "mcq",
    question: "Which of these is an acceptable second definition of the World Wide Web?",
    options: [
      "A registration category identifying a geographic area or purpose",
      "A collection of web pages available on the Internet",
      "A global network of physically connected computers",
      "The set of protocols that route packets between networks"
    ],
    answer: 1,
    explanation: "As well as being defined as a way of accessing information over the medium of the Internet, the Web can be defined as a collection of web pages available on the Internet. The other options define the Internet, TCP/IP and a domain respectively.",
    keyPoints: [
      "Definition 1: a way of accessing information over the Internet",
      "Definition 2: a collection of web pages available on the Internet",
      "Neither definition mentions cables or routing — that is the Internet"
    ]
  },

  {
    id: "c1-11",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Tutorial 1",
    type: "mcq",
    question: "A student uses WhatsApp to send a voice note. Which statement is correct?",
    options: [
      "They are using both the Internet and the Web equally",
      "They are using neither, because messaging apps run on the mobile network only",
      "They are using the Internet but not the Web",
      "They are using the Web but not the Internet"
    ],
    answer: 2,
    explanation: "A messaging app sends data over the Internet, but it does not fetch web pages through a browser, so the Web is not involved. This is the clearest everyday illustration that the Internet and the Web are not the same thing, and that the Internet can be used without the Web.",
    keyPoints: [
      "Messaging apps use the Internet, not the Web",
      "The Web specifically means web pages accessed through a browser",
      "Good example for the question can you have the Internet without the Web"
    ]
  },

  {
    id: "c1-12",
    chapter: 1,
    source: "tutorial",
    sourceLabel: "Tutorial 1",
    type: "mcq",
    question: "Why are Internet technologies described as important in daily life?",
    options: [
      "They are the only way to store data securely",
      "They have replaced all forms of face-to-face communication",
      "They are required by law in most countries",
      "They have become the default medium for work, study, communication, banking and shopping"
    ],
    answer: 3,
    explanation: "Internet technologies matter because almost everyone now relies on them for ordinary daily activities: work, study, messaging, phone calls, banking, shopping, gaming and browsing. What began as a specialist research network has become the default medium for communication and commerce — which is exactly why the privacy and security material in Chapter 4 matters so much.",
    keyPoints: [
      "Used daily for work, study, communication, banking, shopping, entertainment",
      "Shifted from specialist research network to everyday default",
      "Its centrality is what makes privacy and security a serious concern"
    ]
  },


  /* ==================================================== CHAPTER 2 ======= */

  {
    id: "c2-01",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "Who invented the World Wide Web, and in which year?",
    options: [
      "Sir Tim Berners-Lee, in 1989",
      "Sir Tim Berners-Lee, in 1969",
      "The ARPANET team, in 1969",
      "The World Wide Web Consortium, in 1991"
    ],
    answer: 0,
    explanation: "The World Wide Web was invented by Sir Tim Berners-Lee in 1989. 1969 is the year of the ARPANET project, which is the beginning of the Internet, not the Web. 1991 is the start of the Web 1.0 period, not the year of invention.",
    keyPoints: [
      "Tim Berners-Lee, 1989",
      "1969 = ARPANET = the Internet",
      "1991 = start of the Web 1.0 era"
    ]
  },

  {
    id: "c2-02",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "What was Tim Berners-Lee originally trying to achieve when he invented the Web?",
    options: [
      "A secure military communications system",
      "A new way for scientists to share data with each other",
      "A commercial platform for selling goods online",
      "A replacement for the telephone network"
    ],
    answer: 1,
    explanation: "He was not building a consumer product. He was looking for a new way for scientists to share data with one another. The commercial web came much later, in the Web 2.0 era, and the military origin belongs to ARPANET, not to the Web.",
    keyPoints: [
      "Original purpose: sharing data between scientists",
      "Commercial use came later",
      "Military research origin belongs to ARPANET"
    ]
  },

  {
    id: "c2-03",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "Which period and description match Web 1.0?",
    options: [
      "Post-2001, static pages that users could not edit",
      "1969–1989, the research network that preceded the Web",
      "1991–2001, static web pages with linear content and one-way communication",
      "1991–2001, dynamic pages with rich media and social platforms"
    ],
    answer: 2,
    explanation: "Web 1.0 ran from 1991 to 2001. It was the early stage of the World Wide Web, characterised by static web pages with linear content, limited user interaction and one-way communication. Dynamic pages and rich media belong to Web 2.0, which began after 2001.",
    keyPoints: [
      "Period: 1991–2001",
      "Static pages, linear content",
      "Limited interaction, one-way communication"
    ]
  },

  {
    id: "c2-04",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "What were the main limitations of Web 1.0?",
    options: [
      "Pages loaded too slowly because of heavy video content",
      "Search engines could not process the meaning of the content",
      "Too many users were creating their own content at once",
      "Pages were static and users could not interact with the sites"
    ],
    answer: 3,
    explanation: "The limitation of Web 1.0 was that pages were static and users could not interact with them — communication ran one way only, with no user-generated content. The inability of machines to process the meaning of content is the problem Web 3.0 addresses, and heavy media and user-generated content are features of Web 2.0, not limitations of Web 1.0.",
    keyPoints: [
      "Static pages only",
      "No user interaction — one-way communication",
      "Linear content with no user contribution"
    ]
  },

  {
    id: "c2-05",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "Which of these describes Web 2.0?",
    options: [
      "Dynamic web pages, rich media content and interactive platforms such as social media",
      "Static web pages with linear content and one-way communication",
      "A semantic data space where algorithms allow machine processing of content",
      "The original research network built to connect universities"
    ],
    answer: 0,
    explanation: "Web 2.0, from after 2001, is marked by the emergence of dynamic web pages, rich media content and interactive platforms such as social media. Bandwidth improved over the same period, which is part of what made rich media practical.",
    keyPoints: [
      "Post-2001",
      "Dynamic pages and rich media",
      "Interactive platforms such as social media",
      "Improved bandwidth"
    ]
  },

  {
    id: "c2-06",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "Web 3.0 is also known as:",
    options: [
      "The Dynamic Web",
      "The Semantic Web",
      "The Static Web",
      "The Social Web"
    ],
    answer: 1,
    explanation: "Web 3.0 is the Semantic Web. It represents the evolution of the Web into a semantic, interconnected data space, where advanced algorithms and new standards allow machine processing of content — which is what leads to smarter search engines. The Social Web is a nickname for Web 2.0, and the Static Web describes Web 1.0.",
    keyPoints: [
      "Web 3.0 = Semantic Web",
      "Interconnected data space",
      "Machines can process the meaning of content",
      "Result: smarter search engines"
    ]
  },

  {
    id: "c2-07",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "A website lets users post their own photos, comment on each other's posts and stream video. Which generation of the Web does it belong to?",
    options: [
      "Web 3.0",
      "None — user-generated content sits outside the web generations",
      "Web 2.0",
      "Web 1.0"
    ],
    answer: 2,
    explanation: "User-generated content, interaction between users and rich media are the defining features of Web 2.0. Web 1.0 offered none of them, because its pages were static and one-way. Web 3.0 is defined by machine-readable meaning rather than by user interaction, so a plain social platform is still Web 2.0.",
    keyPoints: [
      "User-generated content and interaction = Web 2.0",
      "Rich media = Web 2.0",
      "Web 3.0 is about machine processing of meaning, not interaction"
    ]
  },

  {
    id: "c2-08",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "What does HTTP stand for?",
    options: [
      "Hypertext Transform Protocol",
      "Hypertext Transmission Program",
      "High Transfer Text Protocol",
      "Hypertext Transfer Protocol"
    ],
    answer: 3,
    explanation: "HTTP is the Hypertext Transfer Protocol. It is transfer, not transform — a common slip that costs an easy mark. It is a set of rules for exchanging files on the World Wide Web.",
    keyPoints: [
      "Hypertext Transfer Protocol",
      "Transfer, never transform",
      "A set of rules for exchanging files on the Web"
    ]
  },

  {
    id: "c2-09",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "Which statement best describes how HTTP works?",
    options: [
      "It is the set of rules governing how the client and the web server exchange files — the client sends a request and the server sends a response",
      "It translates domain names into IP addresses so the request can be routed",
      "It encodes non-text attachments so they can travel over the network",
      "It splits data into packets and guarantees they arrive in the right order"
    ],
    answer: 0,
    explanation: "HTTP is the protocol responsible for how the web server and the web user communicate: it is the agreed set of rules for exchanging files — text, graphics, images, sound and video — between client and server. The client sends a request and the server sends back a response. Translating names to IP addresses is DNS, encoding attachments is MIME, and reliable packet delivery is TCP.",
    keyPoints: [
      "Rules for exchanging files between client and server",
      "Request from the client, response from the server",
      "Not DNS (name lookup), not MIME (encoding), not TCP (packets)"
    ]
  },

  {
    id: "c2-10",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "A URL generally takes which form?",
    options: [
      "protocol.address.type",
      "protocol://address",
      "address://protocol",
      "username@domain"
    ],
    answer: 1,
    explanation: "A URL is a standard way of expressing the location and data type of a resource, and it generally takes the form protocol://address. The protocol is something like HTTP, FTP or telnet, and the address is the server name of the resource. The form username@domain is an email address, not a URL.",
    keyPoints: [
      "Form: protocol://address",
      "Protocol examples: HTTP, FTP, telnet",
      "Address = the server name of the resource",
      "username@domain is an email address, not a URL"
    ]
  },

  {
    id: "c2-11",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "In the seven steps of how the Internet works, what does DNS do?",
    options: [
      "Exchanges traffic between different ISPs",
      "Splits the returned page into packets",
      "Translates a domain name such as www.google.com into an IP address",
      "Connects your device to the web and forwards the request"
    ],
    answer: 2,
    explanation: "DNS is step 2: it translates the human-readable domain name you typed, such as www.google.com, into an IP address such as 100.120.12.3. Connecting you and forwarding the request is the ISP at step 3; exchanging traffic between ISPs is the NAP at step 4; and splitting the page into packets is TCP/IP at step 6.",
    keyPoints: [
      "DNS = step 2",
      "Translates domain name into IP address",
      "ISP = step 3, NAP = step 4, TCP/IP = step 6"
    ]
  },

  {
    id: "c2-12",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "What is the role of a NAP in the seven-step process?",
    options: [
      "It stores the web pages and sends them back to the browser",
      "It converts the domain name into an IP address",
      "It encrypts the connection between the browser and the server",
      "It helps exchange traffic between ISPs and routes data between your ISP and the web server"
    ],
    answer: 3,
    explanation: "A network access point, or NAP, is step 4 in the process and is used if needed: it helps exchange traffic between ISPs and routes data between your ISP and the web server. Storing and returning pages is the job of the web server, name translation is DNS, and encryption is not part of the seven steps at all.",
    keyPoints: [
      "NAP = step 4, and only if needed",
      "Exchanges traffic between ISPs",
      "Routes data between your ISP and the web server"
    ]
  },

  {
    id: "c2-13",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "In the seven-step process, what happens at the TCP/IP step?",
    options: [
      "The server sends the webpage back in packets, and IP ensures they reach you",
      "The browser requests the homepage from the server",
      "Your ISP establishes the physical connection",
      "The domain name is resolved to a numeric address"
    ],
    answer: 0,
    explanation: "TCP/IP is step 6, on the return journey: Google's server sends the webpage back in packets, and IP makes sure they reach you. Step 5 is the HTTP request going out, step 3 is the ISP connecting you, and step 2 is DNS resolving the name.",
    keyPoints: [
      "TCP/IP = step 6, the return journey",
      "The page comes back as packets",
      "IP is responsible for the packets reaching the right destination"
    ]
  },

  {
    id: "c2-14",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "What is HTML?",
    options: [
      "The unique address of a page on the Internet",
      "A tagging language used to compose documents that will be viewed by a web browser",
      "A protocol for exchanging files between a client and a server",
      "Software that stores and transmits web documents"
    ],
    answer: 1,
    explanation: "HTML — Hypertext Markup Language — is a tagging language used to compose documents that will be viewed by a web browser. The distractors are HTTP, a web server and a URL respectively; those three are all easy to confuse with HTML under exam pressure because they all begin with H or relate to the same page.",
    keyPoints: [
      "Hypertext Markup Language",
      "A tagging language for documents viewed in a browser",
      "HTML = the document; HTTP = the protocol that moves it"
    ]
  },

  {
    id: "c2-15",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "Why was HTML adopted as a standard?",
    options: [
      "Because it encrypts page content against interception",
      "Because it allows servers to process the meaning of the content",
      "So that no matter which computer platform someone is using, the browser knows how to display the document",
      "Because it compresses documents so they travel faster over the network"
    ],
    answer: 2,
    explanation: "HTML was adopted so that no matter what computer platform someone is using, the web browser knows how to display the web document. It is about platform independence and consistent display, not about compression, security or meaning. Machine-processable meaning is a Web 3.0 idea.",
    keyPoints: [
      "Platform independence",
      "Any browser on any platform can display the document",
      "Not about compression, encryption or semantics"
    ]
  },

  {
    id: "c2-16",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "In a client/server relationship, what is the client?",
    options: [
      "The program that provides a service to other programs",
      "The machine that stores and transmits web documents",
      "The network hardware that routes packets between networks",
      "The requesting program — for example the user of a web browser making a request"
    ],
    answer: 3,
    explanation: "The client is the requesting program in a client/server relationship — for example, the user of a web browser making a request. The program that provides the service is the server, and the machine that specifically stores and transmits web documents is a web server.",
    keyPoints: [
      "Client = the requesting program",
      "Example: a web browser making a request",
      "Server = the program that provides the service"
    ]
  },

  {
    id: "c2-17",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "What is a server, in general terms?",
    options: [
      "A computer program that provides a service to other computer programs, on the same or other computers",
      "Any physical machine kept in a data centre",
      "The browser software used to view web pages",
      "The set of rules that govern data transport across a network"
    ],
    answer: 0,
    explanation: "In general, a server is a computer program that provides a service to other computer programs, whether they are on the same computer or on other computers. Note that the definition is about the program and its role, not about the physical hardware — a server program can run on an ordinary machine.",
    keyPoints: [
      "A program that provides a service to other programs",
      "Can be on the same computer or a different one",
      "Defined by role, not by hardware"
    ]
  },

  {
    id: "c2-18",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "Which of these is a correct description of a web server?",
    options: [
      "It transfers files between computers — for example FTP",
      "It stores and transmits web documents using HTTP — for example Apache, Nginx or IIS",
      "It translates domain names into IP addresses — for example Google DNS",
      "It displays web documents to the user — for example Chrome or Firefox"
    ],
    answer: 1,
    explanation: "A web server stores and transmits web documents. It uses the HTTP protocol to connect to other computers and distribute information, and examples include Apache, Nginx and IIS. Chrome and Firefox are browsers — clients, not servers.",
    keyPoints: [
      "Stores and transmits web documents",
      "Uses HTTP to connect and distribute information",
      "Examples: Apache, Nginx, IIS"
    ]
  },

  {
    id: "c2-19",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "What is the difference between a web page and a website?",
    options: [
      "A web page is static; a website is always dynamic",
      "A web page belongs to one person; a website belongs to a company",
      "A web page is a single HTML document of text, graphics, sound and animation; a website is a collection of web pages connected by hypertext links",
      "A web page is stored on a server; a website is stored on the user's computer"
    ],
    answer: 2,
    explanation: "A web page is a mixture of text, graphics, sound and animation in HTML format, presenting information in an easy-to-understand form over the Internet. A website is a collection of such pages connected by clickable hypertext links, normally under one domain. The relationship is simply one of part to whole.",
    keyPoints: [
      "Web page = one document, mixing text, graphics, sound, animation, in HTML",
      "Website = a collection of web pages",
      "The pages are connected by clickable hypertext links"
    ]
  },

  {
    id: "c2-20",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "What is website hosting?",
    options: [
      "Registering a domain name with a registration authority",
      "Designing the layout and content of the pages",
      "Filtering which visitors are allowed to reach the site",
      "Storing a designed website on a computer that can be reached through the Internet and the Web"
    ],
    answer: 3,
    explanation: "After a website has been designed it must be stored on a computer that can be accessed through the Internet and the World Wide Web — that storage and service is hosting. Registering the name is a separate step, designing is what happens before hosting, and filtering visitors is what a firewall does.",
    keyPoints: [
      "Storing the finished site on an Internet-accessible computer",
      "Comes after design",
      "Different from registering a domain name"
    ]
  },

  {
    id: "c2-21",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "On the Internet, a domain is best described as:",
    options: [
      "A registration category identifying a geographic area or a purpose",
      "The physical server on which a website is stored",
      "The unique address of a single web page",
      "The protocol used to reach a resource"
    ],
    answer: 0,
    explanation: "A domain is a registration category identifying a geographic area or a purpose. For example .com identifies a commercial organisation, .edu an educational organisation and .gov a branch of the US government. The unique address of a single page is a URL, which contains the domain but is not the same thing.",
    keyPoints: [
      "A registration category — geographic area or purpose",
      ".com = commercial organisation",
      ".edu = educational organisation",
      ".gov = a branch of the US government"
    ]
  },

  {
    id: "c2-22",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "What is FTP used for?",
    options: [
      "Resolving domain names into IP addresses",
      "Transferring files over the Internet, copying any kind of file from one computer to another",
      "Exchanging hypertext documents between a browser and a web server",
      "Encoding non-text attachments so they can travel by email"
    ],
    answer: 1,
    explanation: "FTP — File Transfer Protocol — is the standard used to transfer files over the Internet, allowing you to copy any kind of computer file from one computer to another. HTTP handles hypertext documents on the Web, MIME encodes email attachments, and DNS resolves names.",
    keyPoints: [
      "File Transfer Protocol",
      "Standard for transferring files over the Internet",
      "Copies any kind of file between computers",
      "Also a valid protocol in a URL: ftp://"
    ]
  },

  {
    id: "c2-23",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Tutorial 2",
    type: "mcq",
    question: "What is the difference between an intranet and an extranet?",
    options: [
      "An intranet uses HTTP; an extranet uses FTP",
      "An intranet is a physical network; an extranet is a wireless one",
      "An intranet is private to an organisation's own employees; an extranet is shared with third-party clients or partners as well",
      "An intranet is available to the public; an extranet is restricted to employees"
    ],
    answer: 2,
    explanation: "An intranet is a private internal network belonging to an organisation and used by its own employees. An extranet is a private network that the organisation shares with third parties — clients or partners — for example to present its products or services to them. The distinction is purely about who is allowed in: intranet is employees only, extranet is employees plus selected outsiders, and the Internet is everyone.",
    keyPoints: [
      "Intranet = private, internal, employees only",
      "Extranet = shared with selected third-party clients or partners",
      "The difference is who has access, not the technology used",
      "Note: these come from Tutorial 2, not from the chapter summary"
    ]
  },

  {
    id: "c2-24",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "What is a firewall?",
    options: [
      "Software that encrypts data so that only the recipient can read it",
      "A program that scans files on a computer and removes viruses it finds",
      "A backup system that restores data after a natural disaster",
      "A program, usually on an internet gateway server, that protects the resources of one network from users on other networks"
    ],
    answer: 3,
    explanation: "A firewall is a program — usually running on an internet gateway server — that protects the resources of one network from users on other networks. It is used to prevent outsiders from reaching your private data resources. It is a barrier, not a scanner: encryption, antivirus and backup are separate protective measures.",
    keyPoints: [
      "Usually runs on an internet gateway server",
      "Protects one network's resources from users of other networks",
      "Prevents outsiders reaching private data",
      "Can be dedicated hardware, software on a machine, or a managed service"
    ]
  },

  {
    id: "c2-25",
    chapter: 2,
    source: "tutorial",
    sourceLabel: "Summary — Ch 2",
    type: "mcq",
    question: "Which type of firewall acts as an intermediary between a recipient and an external system, hiding your IP address from attack?",
    options: [
      "Proxy",
      "Packet filtering",
      "Keywords",
      "Ports"
    ],
    answer: 0,
    explanation: "A proxy firewall acts as the intermediary between a recipient and an external system, with the result that your system's IP address is hidden from attack. Packet filtering decides which packets may flow through, keyword filtering sifts the data for particular words, and port filtering restricts services to specified ports.",
    keyPoints: [
      "Proxy = intermediary between you and the external system",
      "Effect: your IP address is hidden",
      "The eight types: packet filtering, proxy, inspection, IP addresses, domain names, protocol, ports, keywords"
    ]
  },


  /* ==================================================== CHAPTER 3 ======= */

  {
    id: "c3-01",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "What is email?",
    options: [
      "A hardware and software system that routes messages based on the recipient's address",
      "A form of communication in which electronic messages are created and transferred between two or more devices connected to a network",
      "A protocol that decides which path a message takes across the Internet",
      "Software that requests mail delivery from a mail server to your device"
    ],
    answer: 1,
    explanation: "Email is a form of communication in which electronic messages are created and transferred between two or more devices connected to a network. The distractors are the definitions of SMTP, mail client software and a mail server — all parts of the email system, but none of them the definition of email itself.",
    keyPoints: [
      "A form of communication using electronic messages",
      "Messages created and transferred between two or more devices",
      "The devices must be connected to a network"
    ]
  },

  {
    id: "c3-02",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "What are the main advantages of email over standard mail delivery?",
    options: [
      "It can carry physical objects as well as text",
      "It does not require the sender to know the recipient's address",
      "It is far easier to handle and far faster — seconds rather than days",
      "It is impossible to intercept and always guaranteed to be delivered"
    ],
    answer: 2,
    explanation: "Email is so easy to handle that it has become an extremely useful tool for reaching people, whereas standard mail involves many physical steps before the message reaches the receiver. It is also much faster: an email arrives in seconds, while standard mail can take days. It is not more secure, and like postal mail it still requires the sender to know the address.",
    keyPoints: [
      "Ease of handling — no physical steps",
      "Speed — seconds rather than days",
      "One message can reach many recipients at no extra cost",
      "It is not inherently more secure than postal mail"
    ]
  },

  {
    id: "c3-03",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "Which of the following is listed as a SIMILARITY between email and postal mail?",
    options: [
      "Your message may go to a computer postmaster when there is a problem",
      "It is so easy to create that you may send a response you later regret",
      "It has become an extremely useful tool because it is easy to handle",
      "Your message may come back to you if it cannot be delivered"
    ],
    answer: 3,
    explanation: "The similarities include: you place the message in an electronic envelope and address it; it may come back to you if it cannot be delivered; the sender must know your address; you can keep in touch with friends; your mail may be read by someone else; and not everything you receive will be pleasant. The other three options are all listed as differences, not similarities.",
    keyPoints: [
      "Undeliverable mail comes back — true of both",
      "Both need an envelope and an address",
      "Both can be read by someone else",
      "Not all mail received is pleasant"
    ]
  },

  {
    id: "c3-04",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "Which of the following is listed as a DIFFERENCE between email and postal mail?",
    options: [
      "When there is a problem, your email may go to a computer postmaster",
      "The sender needs to know your address before anything can be sent",
      "Your mail may be delivered to and read by someone else",
      "You can keep in touch with your friends using it"
    ],
    answer: 0,
    explanation: "The three differences listed are: email is so easy to handle that it has become an extremely useful tool for reaching people; when there is a problem your email may go to a computer postmaster rather than a human one; and because email is very easy to create, it can lead to responses you later regret. The other options are all similarities shared with postal mail.",
    keyPoints: [
      "Problems go to a computer postmaster, not a human one",
      "Ease of handling makes it far more useful for reaching people",
      "Ease of creation leads to regrettable replies"
    ]
  },

  {
    id: "c3-05",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "In the process of sending an email, what happens immediately after the sender clicks send?",
    options: [
      "The recipient's client retrieves the message using POP3 or IMAP",
      "The email client contacts the SMTP server of the sender's email service provider",
      "A DNS server is queried for the recipient's IP address",
      "The message is placed directly in the recipient's mailbox"
    ],
    answer: 1,
    explanation: "Step 2 of the seven-step process: once the sender composes the message and clicks send, the email client contacts the SMTP server of the sender's own email service provider. The DNS query happens later, at step 4, and only if the recipient is on a different domain. Retrieval by POP3 or IMAP is the last step of all.",
    keyPoints: [
      "Step 1: compose and click send",
      "Step 2: the client contacts the sender's SMTP server",
      "DNS comes later, at step 4"
    ]
  },

  {
    id: "c3-06",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "What does the sender's SMTP server check first?",
    options: [
      "Whether the recipient's mailbox has enough free space",
      "Whether the recipient's client uses POP3 or IMAP",
      "Whether the recipient's domain is the same as the sender's — if so, the email is redirected internally",
      "Whether the message contains any non-text attachments needing encoding"
    ],
    answer: 2,
    explanation: "At step 3 the SMTP server checks whether the recipient's domain is the same as the sender's. If it is, the email never leaves the provider and is redirected internally. Only if the domain is different does the server need to look up the destination, which is what triggers the DNS query at step 4.",
    keyPoints: [
      "Step 3: is the recipient's domain the same as the sender's?",
      "Same domain → redirected internally, no external routing",
      "Different domain → go to step 4 and query DNS"
    ]
  },

  {
    id: "c3-07",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "Why does the SMTP server query a DNS server when sending an email?",
    options: [
      "To confirm that the recipient's password is correct",
      "To encode attachments so they can travel over the Internet",
      "To decide whether the recipient will use POP3 or IMAP",
      "To find the IP address of the recipient's mail server, when the recipient is on a different domain"
    ],
    answer: 3,
    explanation: "At step 4, if the recipient's domain is different from the sender's, the SMTP server queries a DNS server to find the IP address of the recipient's mail server. This is exactly the same job DNS does for web browsing — turning a name into an address — applied to mail routing instead of page requests.",
    keyPoints: [
      "Step 4, and only when the domains differ",
      "DNS returns the IP address of the recipient's mail server",
      "Same DNS role as in web browsing: name → address"
    ]
  },

  {
    id: "c3-08",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "What happens when the email arrives at the recipient's SMTP server?",
    options: [
      "It is passed to a mail delivery system, which places it in the recipient's mailbox",
      "It is forwarded straight back to the sender's SMTP server for confirmation",
      "It is displayed immediately on the recipient's screen",
      "It is re-encoded by MIME before being stored"
    ],
    answer: 0,
    explanation: "At step 6, on arrival, the recipient's SMTP server passes the email to a mail delivery system, which places the message in the recipient's mailbox. Note that the message sits in the mailbox until the recipient's client actively fetches it at step 7 — it is not pushed onto their screen.",
    keyPoints: [
      "Step 6: arrival at the recipient's SMTP server",
      "Passed to a mail delivery system",
      "Placed in the recipient's mailbox, where it waits"
    ]
  },

  {
    id: "c3-09",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "Which protocols are used in the final step, when the recipient reads the message?",
    options: [
      "HTTP or FTP",
      "POP3 or IMAP",
      "SMTP or MIME",
      "SMTP only"
    ],
    answer: 1,
    explanation: "At step 7 the recipient's email client uses either POP3 or IMAP to retrieve the message from the mailbox so it can be read. SMTP is the sending protocol and is used at every earlier step, but it never retrieves mail — if a question asks which protocol retrieves messages, the answer is never SMTP.",
    keyPoints: [
      "Step 7: retrieval by POP3 or IMAP",
      "SMTP sends, it never retrieves",
      "MIME only encodes non-text content; it does not move messages"
    ]
  },

  {
    id: "c3-10",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "What does SMTP do?",
    options: [
      "Retrieves messages from a server without downloading them",
      "Encodes non-text data so it can travel over the Internet",
      "Decides which paths an email message will take on the Internet when it is sent",
      "Handles incoming messages by downloading them to the local device"
    ],
    answer: 2,
    explanation: "SMTP — Simple Mail Transfer Protocol — decides which paths an email message will take on the Internet. It is the outgoing protocol, used from the moment the client hands the message over until it reaches the recipient's server. The three distractors are POP, IMAP and MIME.",
    keyPoints: [
      "Simple Mail Transfer Protocol",
      "Decides the path the message takes",
      "The outgoing protocol — used on both sending and receiving servers, but never for retrieval"
    ]
  },

  {
    id: "c3-11",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "What does POP do?",
    options: [
      "Decides which route an outgoing message takes",
      "Specifies how to encode graphics and sound for transmission",
      "Resolves a domain name into the IP address of a mail server",
      "Handles incoming messages, downloading them to the local device"
    ],
    answer: 3,
    explanation: "POP — Post Office Protocol — handles incoming messages and downloads them locally onto the device. It is rarely used nowadays, having been largely replaced by IMAP, which leaves the messages on the server instead.",
    keyPoints: [
      "Post Office Protocol",
      "Handles incoming messages",
      "Downloads them to the local device",
      "Little used today compared with IMAP"
    ]
  },

  {
    id: "c3-12",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "How does IMAP differ from POP?",
    options: [
      "IMAP lets the client read mail on the server without downloading it to the local device",
      "IMAP sends mail while POP receives it",
      "IMAP encodes attachments while POP handles plain text only",
      "IMAP works only on mobile devices while POP works only on desktops"
    ],
    answer: 0,
    explanation: "Both POP and IMAP are protocols for retrieving mail, so both are incoming protocols. The difference is where the message lives: POP downloads it to the local device, while IMAP allows the client to read the message on the server without downloading it. That is why an IMAP mailbox stays in sync across your phone and your laptop, whereas POP tends to pull mail onto one machine.",
    keyPoints: [
      "Both are incoming/retrieval protocols",
      "POP downloads locally; IMAP reads on the server",
      "IMAP keeps the mailbox consistent across devices",
      "Neither of them sends mail — that is SMTP"
    ]
  },

  {
    id: "c3-13",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "What does MIME stand for, and what does it do?",
    options: [
      "Mail Identity Management Extension — it verifies that the sender is who they claim to be",
      "Multipurpose Internet Mail Extensions — it specifies how to encode non-text data such as graphics and sound so it can travel over the Internet",
      "Mail Internet Message Encoding — it compresses messages so they take less bandwidth",
      "Multipart Internet Mailbox Exchange — it synchronises mailboxes between devices"
    ],
    answer: 1,
    explanation: "MIME is the Multipurpose Internet Mail Extensions protocol. It specifies how to encode non-text data, such as graphics and sounds, so that the data can travel over the Internet. Without it, email could carry plain text only — MIME is what makes attachments possible.",
    keyPoints: [
      "Multipurpose Internet Mail Extensions",
      "Encodes non-text data: graphics, sound and other attachments",
      "Makes the data able to travel over the Internet",
      "It encodes; it does not send or retrieve"
    ]
  },

  {
    id: "c3-14",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "You attach a photograph to an email. Which protocol makes it possible for the image to travel over the Internet?",
    options: [
      "IMAP",
      "POP3",
      "MIME",
      "SMTP"
    ],
    answer: 2,
    explanation: "MIME is the protocol that specifies how to encode non-text data such as graphics and sounds so it can travel over the Internet, so it is what handles the photograph. SMTP still moves the message from server to server and IMAP or POP3 still fetches it at the other end, but the encoding of the image itself is MIME's job.",
    keyPoints: [
      "MIME encodes the non-text attachment",
      "SMTP still routes the message",
      "POP3/IMAP still retrieve it at the far end"
    ]
  },

  {
    id: "c3-15",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "What is a mail server?",
    options: [
      "Software that requests mail delivery from the server to your internet device",
      "The protocol that governs how mail packets flow over the Internet",
      "The part of an email address that identifies a person within an organisation",
      "A hardware and software system that determines, from the recipient's address, which electronic route to send the message on"
    ],
    answer: 3,
    explanation: "A mail server is a hardware and software system that determines, from the recipient's address, one of several possible electronic routes on which to send the message. The distractors are mail client software, a protocol and a username respectively.",
    keyPoints: [
      "A hardware and software system",
      "Reads the recipient's address",
      "Chooses which of several electronic routes to use"
    ]
  },

  {
    id: "c3-16",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "What is mail client software?",
    options: [
      "Software that requests mail delivery from the mail server to your internet device",
      "A system that chooses the route a message will take across the network",
      "A protocol that encodes attachments before sending",
      "A server that stores every message ever sent through it"
    ],
    answer: 0,
    explanation: "Mail client software is the software that requests mail delivery from the mail server to your internet device. It is the client side of the client/server relationship: the server holds the mail, and the client asks for it — using POP3 or IMAP to do so.",
    keyPoints: [
      "Requests mail delivery from the server to your device",
      "The client half of the client/server relationship",
      "Uses POP3 or IMAP to retrieve messages"
    ]
  },

  {
    id: "c3-17",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "How many parts does an email address have, and what separates them?",
    options: [
      "One part, with the domain implied by the mail server",
      "Two parts, separated by an at sign (@)",
      "Three parts, separated by full stops",
      "Two parts, separated by a forward slash"
    ],
    answer: 1,
    explanation: "An email address uniquely identifies an individual or organisation connected to the Internet, and it has two parts separated by an at sign: the username and the domain name. Do not confuse this with a URL, whose form is protocol://address.",
    keyPoints: [
      "Two parts",
      "Separated by @",
      "Part 1 = username, part 2 = domain name",
      "The whole address uniquely identifies an individual or organisation"
    ]
  },

  {
    id: "c3-18",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "What is the difference between the username and the domain name in an email address?",
    options: [
      "The username is chosen by the provider; the domain name is chosen by the user",
      "The username is public; the domain name is private",
      "The username identifies a person within an organisation; the domain name specifies the server to which the mail is delivered",
      "The username identifies the mail server; the domain name identifies the country"
    ],
    answer: 2,
    explanation: "The username identifies a person within an organisation, and the domain name specifies the server to which the email is to be delivered. The two are separated by an at sign. In routing terms, the domain decides where the message goes and the username decides which mailbox it lands in once it gets there.",
    keyPoints: [
      "Username = identifies a person within an organisation",
      "Domain name = specifies the delivery server",
      "Domain decides where; username decides whose mailbox"
    ]
  },

  {
    id: "c3-19",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "What does CC mean in an email?",
    options: [
      "Carbon Copy — it sends a copy that is hidden from all the other recipients",
      "Confidential Copy — it sends a copy that cannot be forwarded",
      "Cancelled Copy — it withdraws a message that has already been sent",
      "Carbon Copy — it sends someone a copy even though they are not the intended recipient, and everyone can see who was copied"
    ],
    answer: 3,
    explanation: "CC stands for Carbon Copy. Copying someone means sending them a copy of the email even though they are not its intended recipient. Crucially, CC recipients appear in the message headers, so everybody can see who was copied — the hidden version is BCC.",
    keyPoints: [
      "Carbon Copy",
      "Sends a copy to someone who is not the intended recipient",
      "Visible to everyone who receives the message"
    ]
  },

  {
    id: "c3-20",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "What does BCC mean in an email?",
    options: [
      "Blind Carbon Copy — recipients receive a copy but their names are not in the headers, and nobody else knows they were copied",
      "Blind Carbon Copy — recipients receive the message but cannot read the attachments",
      "Basic Carbon Copy — a plain-text copy sent to recipients with older mail clients",
      "Blocked Carbon Copy — a copy that the recipient is prevented from replying to"
    ],
    answer: 0,
    explanation: "BCC stands for Blind Carbon Copy. Anyone included in the BCC list receives a copy of the message, but their name is not included in the message headers, and nobody else who received the message knows that they were sent a copy. It is the privacy option.",
    keyPoints: [
      "Blind Carbon Copy",
      "Recipients do receive the message",
      "Their names are not in the message headers",
      "No other recipient knows they were copied"
    ]
  },

  {
    id: "c3-21",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "A lecturer emails 200 students and does not want any of them to see the other addresses. Which field should they use?",
    options: [
      "Subject",
      "BCC",
      "CC",
      "To"
    ],
    answer: 1,
    explanation: "BCC is the correct field, because BCC recipients are not listed in the message headers and no recipient knows who else was copied. Using CC or To would expose all 200 addresses to everyone on the list. The difference between CC and BCC is entirely one of visibility — both deliver a copy.",
    keyPoints: [
      "BCC hides recipients from one another",
      "CC and To both expose every address",
      "CC vs BCC = visibility, not delivery"
    ]
  },

  {
    id: "c3-22",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "Which of these is a rule of email etiquette?",
    options: [
      "Use shorthand freely so the message stays short",
      "Add humour and jokes to every message so it feels friendly",
      "Include a clear subject line, use an appropriate greeting, and always spell check",
      "Write in capital letters so that the message is easy to read"
    ],
    answer: 2,
    explanation: "The etiquette rules are: include a clear subject and do not shout; always use an appropriate greeting; only use shorthand if you know the recipient; think before you smile; be wary of using humour; and always spell check. Writing in capitals is explicitly listed under netiquette as the thing to avoid, because it reads as shouting.",
    keyPoints: [
      "Clear subject line, and do not shout",
      "Appropriate greeting",
      "Shorthand only with people you know",
      "Think before you smile; be wary of humour; always spell check"
    ]
  },

  {
    id: "c3-23",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Summary — Ch 3",
    type: "mcq",
    question: "Why should you avoid writing an email entirely in capital letters?",
    options: [
      "Because some mail servers reject messages written in capitals",
      "Because capitals cannot be encoded by MIME",
      "Because capitals make the message file size larger",
      "Because it looks as though you are shouting"
    ],
    answer: 3,
    explanation: "Netiquette says to avoid writing messages in all capital letters because it looks like you are shouting. It is a social convention, not a technical restriction — the message will send perfectly well, but it will read as aggressive.",
    keyPoints: [
      "All capitals reads as shouting",
      "A netiquette convention, not a technical limit",
      "Other netiquette rules: keep it short, use a descriptive subject and signature, do not assume everyone likes jokes, use a spell checker"
    ]
  },

  {
    id: "c3-24",
    chapter: 3,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 1",
    type: "mcq",
    question: "Why is email etiquette important?",
    options: [
      "Email is the medium professional life runs on, so how you write it affects your reputation and prevents misunderstandings",
      "Because mail servers will reject badly written messages",
      "Because it is a legal requirement in most workplaces",
      "Because it reduces the size of the message being sent"
    ],
    answer: 0,
    explanation: "Email is how professional communication happens — you cannot deal with colleagues, teammates or other organisations without it. Most people take email seriously and judge you on it, so good etiquette protects your professional reputation, prevents misunderstandings, and saves everyone the unnecessary back-and-forth that a badly written message causes.",
    keyPoints: [
      "Email is the default medium of professional communication",
      "People judge you on how you write",
      "Prevents misunderstanding and wasted exchanges",
      "It is a social and professional matter, not a technical one"
    ]
  },


  /* ==================================================== CHAPTER 4 ======= */

  {
    id: "c4-01",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What are the three most significant concerns when it comes to computer security?",
    options: [
      "Viruses, Worms and Trojan horses",
      "Privacy, Security and Ethics",
      "Intrusion, Sabotage and Natural disasters",
      "Accuracy, Property and Access"
    ],
    answer: 1,
    explanation: "The three main concerns are Privacy, Security and Ethics. Privacy covers threats to personal privacy and how to protect against them; Security covers access to sensitive information and the securing of hardware and software; Ethics covers how the actions of individuals and companies affect society. Intrusion, Sabotage and Natural disasters are the three computer security ISSUES, and Accuracy, Property and Access are the three PRIVACY issues — three separate lists that are easily confused.",
    keyPoints: [
      "Privacy — threats to personal privacy and ways to protect against them",
      "Security — access to sensitive information, control and securing of hardware and software",
      "Ethics — how the actions of individuals and companies affect society",
      "Do NOT answer Intrusion/Sabotage/Natural disasters — those are the security issues"
    ]
  },

  {
    id: "c4-02",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What are the three computer security issues?",
    options: [
      "Accuracy, Property and Access",
      "Phishing, Pretexting and Baiting",
      "Intrusion, Sabotage and Natural disasters",
      "Privacy, Security and Ethics"
    ],
    answer: 2,
    explanation: "The three computer security issues are Intrusion — hackers gaining access without permission; Sabotage — using technology such as viruses or zombies to crack the network; and Natural disasters — acts of nature such as flood or fire. This is a different list from the three main concerns (Privacy, Security, Ethics), and the exam deliberately tests whether you can keep them apart.",
    keyPoints: [
      "Intrusion — hackers gaining access without permission",
      "Sabotage — using technology such as viruses or zombies to crack the network",
      "Natural disasters — acts of nature such as flood or fire",
      "Different list from the three main concerns"
    ]
  },

  {
    id: "c4-03",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "A question asks for the three main CONCERNS of computer security. Which answer is correct?",
    options: [
      "Intrusion, Sabotage, Natural disasters",
      "Physical disasters and Cyber attacks",
      "Accuracy, Property, Access",
      "Privacy, Security, Ethics"
    ],
    answer: 3,
    explanation: "If the wording is concerns, the answer is Privacy, Security and Ethics. Intrusion / Sabotage / Natural disasters answers the question about computer security ISSUES. Physical disasters and Cyber attacks answers the question about the two possible security DISASTERS. Accuracy / Property / Access answers the question about the primary PRIVACY issues. Four separate lists, so read the noun in the question carefully.",
    keyPoints: [
      "Concerns → Privacy, Security, Ethics",
      "Issues → Intrusion, Sabotage, Natural disasters",
      "Disasters → Physical disasters, Cyber attacks",
      "Privacy issues → Accuracy, Property, Access"
    ]
  },

  {
    id: "c4-04",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "How is privacy defined?",
    options: [
      "An individual's ability to eliminate the collection, use and sale of confidential personal information about them",
      "The control and securing of an organisation's hardware and software",
      "A standard of moral conduct governing the use of computers",
      "The coding of information so that only authorised people can read it"
    ],
    answer: 0,
    explanation: "Privacy is an individual's ability to eliminate the collection, use and sale of confidential personal information about them. Note that it is defined as the individual's ability to control what happens to their data — not as secrecy. The distractors define security, ethics and encryption.",
    keyPoints: [
      "An individual's ability to eliminate collection, use and sale of their confidential personal information",
      "About control over your own data",
      "Distinct from security (protecting systems) and ethics (moral conduct)"
    ]
  },

  {
    id: "c4-05",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "What are the three primary privacy issues?",
    options: [
      "Collection, Use and Sale",
      "Accuracy, Property and Access",
      "Privacy, Security and Ethics",
      "Intrusion, Sabotage and Natural disasters"
    ],
    answer: 1,
    explanation: "The three primary privacy issues are Accuracy — the responsibility of those who collect data to keep it correct; Property — who owns the data and who holds the rights to software usage; and Access — the control over who may reach the data, restricting it to authorised users. A useful way to remember them is that each asks a different question: is it right, whose is it, and who can see it.",
    keyPoints: [
      "Accuracy — responsibility of those who collect the data",
      "Property — who owns the data and holds rights to software usage",
      "Access — control over who may reach the data, restricted to authorised users"
    ]
  },

  {
    id: "c4-06",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "Which of these is NOT one of the listed ways in which personal data is gathered?",
    options: [
      "Information resellers and brokers",
      "Web bugs and spyware",
      "Encryption keys",
      "Use of cookies"
    ],
    answer: 2,
    explanation: "The listed ways personal data is gathered are: large organisations, use of cookies, information resellers and brokers, private networks, the Internet and the web, online identity, and web bugs and spyware. Encryption keys are part of protecting data, not gathering it — encryption is a defensive measure.",
    keyPoints: [
      "Large organisations",
      "Use of cookies",
      "Information resellers and brokers",
      "Private networks; the Internet and web; online identity; web bugs and spyware"
    ]
  },

  {
    id: "c4-07",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What is a cookie?",
    options: [
      "An invisible image hidden inside a web page to track you",
      "Software that records every keystroke you type",
      "A program that encrypts your files and demands payment",
      "A small data or text file deposited on your hard disk by websites you have visited"
    ],
    answer: 3,
    explanation: "A cookie is a small data or text file deposited on your hard disk by websites you have visited. Cookies are harmless in themselves, but because they store information about your browsing habits and preferences, users are right to worry that a third party could make use of them. The distractors are a web bug, a keystroke logger and ransomware.",
    keyPoints: [
      "A small data/text file left on your hard disk",
      "Deposited by sites you have visited",
      "Harmless in themselves, but they store browsing habits and preferences",
      "The worry is third-party use of that information"
    ]
  },

  {
    id: "c4-08",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What distinguishes a third-party cookie from a first-party cookie?",
    options: [
      "A third-party cookie is generated by an advertising company working with the site you are visiting",
      "A third-party cookie is generated by the site you are currently visiting",
      "A third-party cookie cannot be deleted by the user",
      "A third-party cookie is stored on the server rather than on your computer"
    ],
    answer: 0,
    explanation: "A first-party cookie is generated by the site you are currently visiting. A third-party cookie is generated by an advertising company that works with the website you are visiting — which is why third-party cookies are the ones associated with tracking you across different sites. Both are stored on your own machine and both can be turned off.",
    keyPoints: [
      "First-party = generated by the site you are on",
      "Third-party = generated by an advertising company working with that site",
      "Third-party cookies are the tracking concern",
      "Turning off cookies is listed as a way to protect your privacy"
    ]
  },

  {
    id: "c4-09",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What is a web bug?",
    options: [
      "A small text file that records your site preferences",
      "An invisible image or piece of HTML code hidden within an email message or a web page",
      "A programming error that makes a website crash",
      "A worm that spreads by filling a server with self-replicating information"
    ],
    answer: 1,
    explanation: "A web bug is an invisible image or HTML code hidden within an email message or a web page, used to track the reader without their knowledge. It is listed as one of the privacy threats, alongside computer monitoring software, keystroke loggers, spyware and online identity. Note the trap in the name: it is not a programming bug.",
    keyPoints: [
      "An invisible image or hidden HTML code",
      "Hidden inside an email message or a web page",
      "Used for tracking — a privacy threat, not a programming error"
    ]
  },

  {
    id: "c4-10",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "Which privacy threat records your activity and keystrokes and can hijack the browser?",
    options: [
      "Cookies",
      "Online identity",
      "Keystroke loggers",
      "Web bugs"
    ],
    answer: 2,
    explanation: "Keystroke loggers record activity and keystrokes, and can hijack the browser. Compare them with spyware, which records and reports internet activity and changes the browser to manipulate what you view, and with computer monitoring software such as SpyAgent, described as the most dangerous because it tracks email and chats as well.",
    keyPoints: [
      "Keystroke loggers — record activity and keystrokes, hijack the browser",
      "Spyware — records and reports internet activity, manipulates what you view",
      "Computer monitoring software (e.g. SpyAgent) — most dangerous; tracks email and chats",
      "Web bugs — invisible images/HTML; Online identity — what you post yourself"
    ]
  },

  {
    id: "c4-11",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "Which of these is a listed way to protect your privacy online?",
    options: [
      "Save account numbers in the browser so you do not have to retype them",
      "Fill in every optional field so that sites hold accurate data about you",
      "Disable your firewall so that trusted sites load faster",
      "Turn off cookies and use privacy modes when browsing"
    ],
    answer: 3,
    explanation: "The listed protections are: use privacy modes when browsing, install anti-spyware programs, use free web-based services, fill in information only when you need to, do not save account numbers or passwords, and turn off cookies. The three wrong options each invert one of those rules — saving credentials, over-sharing and weakening your defences are exactly what you are told not to do.",
    keyPoints: [
      "Use privacy modes when browsing",
      "Install anti-spyware programs",
      "Fill in information only when you need to",
      "Do not save account numbers or passwords",
      "Turn off cookies"
    ]
  },

  {
    id: "c4-12",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What is cybercrime?",
    options: [
      "A criminal offence that involves a computer and a network or the Internet",
      "Any use of a computer that breaches company policy",
      "The practice of manipulating people into revealing private data",
      "The unauthorised copying of software licences"
    ],
    answer: 0,
    explanation: "Cybercrime is a criminal offence that involves a computer and a network or the Internet. It is the umbrella term covering identity theft, internet scams, ransomware, DoS and DDoS attacks, data manipulation, cyberbullying and online sexual predators. Manipulating people into revealing private data is social engineering specifically, which is one technique used within cybercrime.",
    keyPoints: [
      "A criminal offence involving a computer and a network or the Internet",
      "Umbrella term covering many specific crimes",
      "Social engineering is a technique used within it, not a synonym for it"
    ]
  },

  {
    id: "c4-13",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What is the difference between a DoS attack and a DDoS attack?",
    options: [
      "DoS is legal penetration testing; DDoS is always criminal",
      "DoS floods a computer with requests from one source; DDoS uses several computers to make the repeated requests",
      "DoS encrypts the data; DDoS deletes it",
      "DoS targets individuals; DDoS targets governments only"
    ],
    answer: 1,
    explanation: "A denial of service attack attempts to slow down or stop a computer by flooding it with requests. A distributed denial of service attack is similar, but uses several computers to make those repeated requests — the distributed part is the whole difference. Compromised machines used this way are exactly what zombies are for.",
    keyPoints: [
      "DoS — flooding a computer with requests to slow or stop it",
      "DDoS — the same, but from several computers at once",
      "The difference is distribution, not the type of damage",
      "Zombie machines are typically what makes a DDoS possible"
    ]
  },

  {
    id: "c4-14",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "Which type of hacker illegally breaks into systems to flaunt their expertise or to try to sell their services?",
    options: [
      "Black hat",
      "Ethical hacker",
      "Grey hat",
      "White hat"
    ],
    answer: 2,
    explanation: "Grey-hat hackers illegally break into systems in order to flaunt their expertise or to attempt to sell their services afterwards. White-hat or ethical hackers break in for non-malicious purposes, usually to find and report weaknesses; black-hat hackers break in to destroy. Grey hat sits between the two: the method is illegal, but the motive is neither purely helpful nor purely destructive.",
    keyPoints: [
      "White hat / ethical — break in for non-malicious purposes",
      "Black hat — break in to destroy",
      "Grey hat — break in illegally to flaunt expertise or sell their services"
    ]
  },

  {
    id: "c4-15",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What is social engineering?",
    options: [
      "Software designed by criminals to damage a computer system",
      "The use of hardware such as rogue Wi-Fi hotspots to capture data",
      "Coding information so that only authorised people can read it",
      "The practice of manipulating people into divulging private data, through acts such as identity theft, internet scams and data manipulation"
    ],
    answer: 3,
    explanation: "Social engineering is the practice of manipulating people into divulging private data, through acts of identity theft, internet scams and data manipulation. The defining feature is that the target is the person rather than the machine — which is why no firewall or antivirus product can fully prevent it.",
    keyPoints: [
      "Manipulating people into divulging private data",
      "Carried out through identity theft, internet scams and data manipulation",
      "The target is the person, not the machine",
      "Main types: phishing, pretexting, baiting, quid pro quo"
    ]
  },

  {
    id: "c4-16",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What is the difference between baiting and quid pro quo?",
    options: [
      "Baiting offers a free gift or physical item; quid pro quo offers a service instead of a good",
      "Baiting uses email; quid pro quo uses telephone calls",
      "Baiting targets companies; quid pro quo targets individuals",
      "Baiting is a form of malware; quid pro quo is a form of encryption"
    ],
    answer: 0,
    explanation: "Baiting is similar to phishing but uses free gifts as the lure — most famously an infected USB drive left where someone will find it. Quid pro quo is similar to baiting, but the attacker offers a SERVICE rather than a good — for example someone posing as IT support offering to fix your machine in exchange for your password. The distinction is good versus service. Note that the correct spelling is Quid Pro Quo, not the Quad Pro Qua that appears in the tutorial sheet.",
    keyPoints: [
      "Baiting — the lure is a free gift or physical item",
      "Quid Pro Quo — the lure is a service offered in exchange",
      "Classic baiting example: an infected USB drive in a car park",
      "Correct spelling: Quid Pro Quo"
    ]
  },

  {
    id: "c4-17",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "Which pair correctly matches the social engineering technique to its medium?",
    options: [
      "Vishing uses email; smishing uses instant messaging",
      "Vishing uses a voice phone call; smishing uses SMS",
      "Vishing uses SMS; smishing uses a voice phone call",
      "Vishing uses video calls; smishing uses social media"
    ],
    answer: 1,
    explanation: "Vishing is voice phishing, carried out over a telephone call, while smishing is phishing carried out by SMS. Both are variations on phishing that change the medium rather than the underlying trick: an official-looking approach designed to make you reveal personal information. Scareware is the third named variation, which uses fear rather than a change of medium.",
    keyPoints: [
      "Vishing = voice = phone call",
      "Smishing = SMS = text message",
      "Both are phishing with a different medium",
      "Scareware is the third named variation, using fear as the lure"
    ]
  },

  {
    id: "c4-18",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "What is malware?",
    options: [
      "The manipulation of people into revealing confidential information",
      "A firewall configuration that blocks unwanted traffic",
      "Software designed by crackers or computer criminals to damage a computer system",
      "Hardware that criminals use to intercept network traffic"
    ],
    answer: 2,
    explanation: "Malware is software designed by crackers or computer criminals to damage a computer system. The three most common malicious programs are viruses, worms and Trojan horses. Note the contrast with malicious hardware — zombies, rogue Wi-Fi hotspots and infected USB drives — which is a separate category in the notes.",
    keyPoints: [
      "Software designed to damage a computer system",
      "Written by crackers or computer criminals",
      "Three most common: viruses, worms, Trojan horses",
      "Distinct from malicious hardware"
    ]
  },

  {
    id: "c4-19",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "In the context of malicious hardware, what is a zombie?",
    options: [
      "A network imitating legitimate free Wi-Fi in order to capture data",
      "A USB flash drive left on purpose for someone to pick up",
      "A program disguised as legitimate software",
      "A computer connected to a network that has been compromised by a hacker or a virus"
    ],
    answer: 3,
    explanation: "A zombie is a computer connected to a network that has been compromised by a hacker or a virus, and can then be controlled remotely. The other two forms of malicious hardware are rogue Wi-Fi hotspots, which imitate legitimate free Wi-Fi to capture the data passing through, and virus-infected USB flash drives left where someone will pick them up. A program disguised as legitimate software is a Trojan horse — malware, not hardware.",
    keyPoints: [
      "A compromised networked computer, controlled remotely",
      "Compromised by a hacker or a virus",
      "The other malicious hardware: rogue Wi-Fi hotspots, infected USB flash drives",
      "Zombies are what make DDoS attacks possible"
    ]
  },

  {
    id: "c4-20",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Which of the following is a principal measure for protecting computer security?",
    options: [
      "Use firewalls as a security buffer between private networks and all external networks",
      "Disable authentication so that staff can reach systems more quickly",
      "Store all backups on the same machine as the original data",
      "Reply to suspicious emails to confirm whether they are genuine"
    ],
    answer: 0,
    explanation: "The principal measures are: restrict access using security guards and proper authentication; use firewalls as a security buffer between private and external networks; install security suites; stay away from dodgy websites; be alert to email scams and use anti-spam filtering; and back up your data and system. The wrong options each invert one of those measures.",
    keyPoints: [
      "Restrict access — security guards and authentication",
      "Use firewalls — a buffer between private and external networks",
      "Install security suites",
      "Avoid dodgy websites; be alert to email scams; back up your data and system"
    ]
  },

  {
    id: "c4-21",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "What is encryption?",
    options: [
      "Copying information to a second location in case the first is lost",
      "Coding information to make it unreadable except to those permitted to read it, who hold the key to decode it",
      "Deleting information so that it cannot be recovered from the hard disk",
      "Compressing information so that it takes less space in transit"
    ],
    answer: 1,
    explanation: "Encryption is the coding of information to make it unreadable, except for those who are permitted to read it and who hold the key to decode the message. To encrypt is to change plain text into encrypted text. It is used for email, files, websites, VPN connections and wireless networks — the last of these using WPA or WPA2.",
    keyPoints: [
      "Coding information to make it unreadable",
      "Only those with the key can decode it",
      "Encrypt = change plain text into encrypted text",
      "Used for email, files, websites, VPNs, and wireless networks with WPA/WPA2"
    ]
  },

  {
    id: "c4-22",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Which of these is a genuine DISADVANTAGE of data encryption?",
    options: [
      "It makes hacking incidents more likely",
      "It removes the need to manage any keys",
      "It reduces the speed of data flow and consumes bandwidth while the data is being encrypted",
      "It allows unauthorised people to read your information"
    ],
    answer: 2,
    explanation: "The disadvantages of encryption are that it reduces the speed of data flow and consumes bandwidth while data is being encrypted, that it makes file sizes larger, and that it adds complexity to the communication and to key management. The advantages are the opposite: unauthorised people cannot read or spy on your information, and hacking incidents and the damage from interception are reduced.",
    keyPoints: [
      "Disadvantages: slower data flow and bandwidth cost; larger file sizes; added complexity",
      "Advantages: unauthorised people cannot read it; fewer hacking incidents; protects data in transit",
      "Key management is an extra burden, not something encryption removes"
    ]
  },

  {
    id: "c4-23",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Summary — Ch 4",
    type: "mcq",
    question: "Which pair of definitions is correct?",
    options: [
      "Computer ethics = the legal right to control distribution of your work; Plagiarism = copying software without a licence",
      "Computer ethics = a standard of moral conduct in general; Plagiarism = breaking into a system to prove a point",
      "Computer ethics = protecting personal data from collection; Plagiarism = falsifying research data",
      "Computer ethics = guidelines for the morally acceptable use of computers; Plagiarism = using someone else's work or ideas without giving credit"
    ],
    answer: 3,
    explanation: "Ethics in general is a standard of moral conduct; computer ethics narrows that to guidelines for the morally acceptable use of computers. Plagiarism is using someone else's work or ideas without giving credit to the original author. The legal right to control the use and distribution of your work is copyright and digital rights, which is a related but separate idea.",
    keyPoints: [
      "Ethics — a standard of moral conduct",
      "Computer ethics — guidelines for morally acceptable use of computers",
      "Copyright and digital rights — the right to control use and distribution of your work",
      "Plagiarism — using others' work or ideas without credit"
    ]
  },

  /* ---- The 18 MCQs from Tutorial 3 Part 2, with written answers added --- */

  {
    id: "t3p2-01",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "A computer virus differs from a worm in that the virus:",
    options: [
      "Replicates itself without user intervention",
      "Does not need a host program",
      "Requires a host program to spread",
      "Operates independently of software"
    ],
    answer: 2,
    explanation: "A virus migrates through networks and attaches itself to different programs and files — it needs a host program in order to spread. A worm is the opposite: it fills the computer or server with self-replicating information and needs neither a host nor any user action. The other three options all describe a worm, not a virus.",
    keyPoints: [
      "Virus — attaches to programs and files; requires a host",
      "Worm — self-replicating; no host program needed",
      "The distractors here all describe worm behaviour"
    ]
  },

  {
    id: "t3p2-02",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "A Trojan horse is different from a worm because it:",
    options: [
      "Replicates itself",
      "Is embedded in a legitimate program",
      "Does not require user interaction",
      "Always causes immediate damage"
    ],
    answer: 1,
    explanation: "A Trojan horse is a program disguised as something else, or one that triggers a hidden action — it is embedded in something that looks legitimate and relies on the user running it. A worm, by contrast, replicates itself and needs no user interaction at all. Note that a Trojan does not necessarily cause immediate damage; its whole point is to go unnoticed.",
    keyPoints: [
      "Trojan — disguised as, or embedded in, a legitimate program",
      "Trojan needs the user to run it",
      "Worm — self-replicating and requires no user interaction",
      "Damage is not necessarily immediate"
    ]
  },

  {
    id: "t3p2-03",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Which are the two possible security disasters that organizations are concerned with?",
    options: [
      "Physical disasters and Cyber attacks",
      "Software malfunctions and Hardware failures",
      "Electrical outages and Employee turnover",
      "Data leaks and Budget cuts"
    ],
    answer: 0,
    explanation: "The two security disasters organisations worry about are physical disasters and cyber attacks. Physical disasters are natural events such as floods and earthquakes; cyber attacks are the deliberate, human-caused category, and they are what lead to unauthorised data access. Keep this pair separate from the three computer security issues — Intrusion, Sabotage and Natural disasters.",
    keyPoints: [
      "Physical disasters — natural events such as floods and earthquakes",
      "Cyber attacks — deliberate attacks that cause unauthorised data access",
      "Two disasters, not to be confused with the three security issues"
    ]
  },

  {
    id: "t3p2-04",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "What is a common feature of worms?",
    options: [
      "They require a host program to spread",
      "They replicate themselves autonomously",
      "They disguise themselves as legitimate software",
      "They always cause significant damage"
    ],
    answer: 1,
    explanation: "The defining feature of a worm is that it replicates itself autonomously, filling the computer or server with self-replicating information without needing a host program or any action from the user. Requiring a host describes a virus, disguising itself describes a Trojan horse, and no category of malware always causes significant damage.",
    keyPoints: [
      "Worms replicate autonomously",
      "No host program and no user action required",
      "Requiring a host = virus; disguise = Trojan horse"
    ]
  },

  {
    id: "t3p2-05",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "What type of security disaster can lead to unauthorized data access?",
    options: [
      "Physical disasters",
      "Cyber attacks",
      "Hardware failures",
      "Software updates"
    ],
    answer: 1,
    explanation: "Cyber attacks are the security disaster that leads to unauthorised data access, because they are deliberate attempts by an attacker to reach data they have no right to. Physical disasters — floods, fires, earthquakes — destroy or interrupt access rather than granting it to an outsider. This mirrors Intrusion in the list of computer security issues: hackers gaining access without permission.",
    keyPoints: [
      "Cyber attacks → unauthorised data access",
      "Physical disasters → destruction and interruption, not access",
      "Corresponds to Intrusion in the three security issues"
    ]
  },

  {
    id: "t3p2-06",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "In the context of security disasters, physical disasters refer to:",
    options: [
      "Cyber attacks and hacking",
      "Natural events like floods and earthquakes",
      "Data theft and information leakage",
      "Software bugs and glitches"
    ],
    answer: 1,
    explanation: "Physical disasters are natural events such as floods and earthquakes. They match the Natural disasters entry in the three computer security issues — acts of nature such as flood or fire. The other options are all human-caused or technical failures, which fall on the cyber attack side of the pair.",
    keyPoints: [
      "Physical disasters = natural events: floods, earthquakes, fire",
      "Same idea as Natural disasters in the three security issues",
      "Cyber attacks are the other half of the pair"
    ]
  },

  {
    id: "t3p2-07",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "What is Phishing?",
    options: [
      "A technique used to infect computers with malware",
      "The practice of sending emails pretending to be from reputable sources to induce individuals to reveal personal information",
      "A type of software that provides enhanced features for a fee",
      "The act of physically stealing someone's computer or mobile device"
    ],
    answer: 1,
    explanation: "Phishing is the practice of sending emails that pretend to come from reputable sources in order to induce individuals to reveal personal information. In the summary it is described as a technique used by scammers to trick internet users with a fake but official-looking site. The lure is a convincing impersonation — not malware, not a physical theft.",
    keyPoints: [
      "Emails pretending to come from reputable sources",
      "Goal: get the victim to reveal personal information",
      "Often accompanied by a fake but official-looking website",
      "A type of social engineering — it targets the person"
    ]
  },

  {
    id: "t3p2-08",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Baiting differs from other forms of social engineering because it:",
    options: [
      "Involves offering something enticing to the victim",
      "Always uses email as a medium",
      "Is only focused on stealing personal information",
      "Is legal and ethically accepted"
    ],
    answer: 0,
    explanation: "Baiting is similar to phishing but the lure is something enticing — a free gift or a physical item, classically an infected USB drive left where someone will find it. It is specifically not tied to email, and it is certainly not legal. Compare it with quid pro quo, which offers a service rather than a good.",
    keyPoints: [
      "The lure is a free gift or physical item",
      "Not restricted to email — often physical",
      "Quid Pro Quo offers a service instead of a good",
      "Classic example: a USB drive left in a car park"
    ]
  },

  {
    id: "t3p2-09",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Pretexting is a form of social engineering where the attacker:",
    options: [
      "Scares the victim into complying",
      "Offers the victim a reward",
      "Uses a fabricated scenario to steal personal information",
      "Infects the victim's computer with malware"
    ],
    answer: 2,
    explanation: "In pretexting, the attacker focuses on creating a good pretext — a fabricated scenario — and uses it to manipulate the victim into handing over information. Scaring the victim describes scareware, offering a reward describes baiting or quid pro quo, and infecting the machine is malware rather than social engineering.",
    keyPoints: [
      "The attacker invents a convincing scenario",
      "The scenario is used to manipulate the victim into giving up information",
      "Fear = scareware; reward = baiting/quid pro quo"
    ]
  },

  {
    id: "t3p2-10",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Scareware is a type of malware that:",
    options: [
      "Encrypts the victim's files and demands a ransom",
      "Pretends to be security software to trick users into purchasing it",
      "Steals personal information for financial gain",
      "Damages the computer hardware physically"
    ],
    answer: 1,
    explanation: "Scareware pretends to be security software in order to frighten users into purchasing it — typically a pop-up claiming the machine is infected and urging you to download a removal tool, which then asks for payment details. Encrypting files and demanding payment is ransomware, which is a different crime with a similar-sounding shape.",
    keyPoints: [
      "Pretends to be security software",
      "Uses fear as the lure",
      "Goal: get the victim to pay for a fake product",
      "Not the same as ransomware, which encrypts your files"
    ]
  },

  {
    id: "t3p2-11",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "A key characteristic of a phishing email is:",
    options: [
      "It comes from a known contact",
      "It has correct spelling and grammar",
      "It urges immediate action and often contains threats",
      "It contains attachments or links that are safe to open"
    ],
    answer: 2,
    explanation: "Phishing emails create urgency: they push you to act immediately and often contain a threat about what will happen if you do not. Urgency is deliberate, because it stops the victim pausing to check. The other options describe a legitimate email — a known sender, correct spelling and safe links are precisely what phishing lacks.",
    keyPoints: [
      "Urges immediate action",
      "Often contains threats or warnings of consequences",
      "Urgency exists to stop the victim thinking it through",
      "Poor spelling and unexpected senders are further warning signs"
    ]
  },

  {
    id: "t3p2-12",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "In baiting attacks, the bait often takes the form of:",
    options: [
      "A legitimate-looking email",
      "A physical item like a USB drive",
      "An attractive job offer",
      "A false alarm or scareware"
    ],
    answer: 1,
    explanation: "The classic baiting lure is a physical item — most often an infected USB flash drive left somewhere it will be picked up and plugged in. This links directly to the malicious hardware section of the chapter, where virus-infected USB flash drives are listed as one of the three common forms. A legitimate-looking email is phishing, and a false alarm is scareware.",
    keyPoints: [
      "Bait is typically a physical item, most often a USB drive",
      "Also listed under malicious hardware: virus-infected USB flash drives",
      "Legitimate-looking email = phishing; false alarm = scareware"
    ]
  },

  {
    id: "t3p2-13",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Ahmed received an email from his bank asking him to update his account information urgently. The email contained a link to a webpage that resembled his bank's website. This is an example of:",
    options: [
      "Pretexting",
      "Baiting",
      "Phishing",
      "Scareware",
      "Quid Pro Quo"
    ],
    answer: 2,
    explanation: "This is phishing. Every marker is present: an email impersonating a reputable source, a demand for urgent action, and a fake but official-looking website designed to capture personal information. There is no free gift, so it is not baiting; no elaborate invented story, so it is not pretexting; and no fake virus warning, so it is not scareware.",
    keyPoints: [
      "Email impersonating a reputable source = phishing",
      "Urgency + lookalike website are the giveaways",
      "No gift → not baiting; no invented story → not pretexting"
    ]
  },

  {
    id: "t3p2-14",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Sarah found a USB drive at her company's parking lot. Curious, she plugged it into her office computer, which then installed malware. This incident is an example of:",
    options: [
      "Pretexting",
      "Baiting",
      "Phishing",
      "Scareware"
    ],
    answer: 1,
    explanation: "This is the textbook baiting scenario: a physical item left where a curious person will find it, acting as the lure. The attacker does not contact the victim at all — the victim's own curiosity does the work. It also matches the malicious hardware category, where virus-infected USB flash drives are described as being left on purpose in the hope that someone will pick them up.",
    keyPoints: [
      "Physical item as the lure = baiting",
      "The victim's curiosity completes the attack",
      "Also an example of malicious hardware: infected USB flash drives"
    ]
  },

  {
    id: "t3p2-15",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "A pop-up message appeared on Sam's computer claiming that it was infected with a virus and urging him to download a tool to remove it. After downloading, the tool asked for credit card information. This is an example of:",
    options: [
      "Phishing",
      "Baiting",
      "Pretexting",
      "Scareware"
    ],
    answer: 3,
    explanation: "This is scareware. The lure is fear: a false claim that the machine is infected, followed by a fake security tool that demands payment. Scareware is defined as software that pretends to be security software in order to trick users into purchasing it, which is exactly what happens here. Note that it is not ransomware — nothing was encrypted.",
    keyPoints: [
      "Fake virus warning + fake removal tool = scareware",
      "The lure is fear, not a gift or a story",
      "Ends in a request for payment",
      "Not ransomware — no files were encrypted"
    ]
  },

  {
    id: "t3p2-16",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "Fatima received a call from someone claiming to be from the IT department, asking for her password to perform a system update. The caller created a detailed story about the update process. This is an example of:",
    options: [
      "Scareware",
      "Phishing",
      "Baiting",
      "Pretexting"
    ],
    answer: 3,
    explanation: "This is pretexting. The defining detail is the detailed, invented story about the update process — the attacker has built a pretext, a fabricated scenario, and is using it to manipulate the victim into handing over her password. Because it arrives by telephone it would also be described as vishing, but among these four options pretexting is the technique being tested.",
    keyPoints: [
      "A detailed fabricated scenario = pretexting",
      "The invented story is the tool of manipulation",
      "Delivered by phone, so also an example of vishing",
      "No fear, no gift, no fake website"
    ]
  },

  {
    id: "t3p2-17",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "A company received an email from a supposed vendor asking for immediate payment of an overdue invoice. The email included details specific to the company, making the request seem legitimate. This scenario is an example of:",
    options: [
      "Scareware",
      "Baiting",
      "Pretexting",
      "Quid Pro Quo"
    ],
    answer: 2,
    explanation: "This is pretexting. The attacker has constructed a fabricated but specific scenario — an overdue invoice from a known vendor, complete with details particular to the company — and that constructed credibility is what does the persuading. There is no free gift, so not baiting; no service offered in exchange, so not quid pro quo; and no fear of infection, so not scareware.",
    keyPoints: [
      "A fabricated scenario built from specific, credible details",
      "The credibility of the story is the attack",
      "No gift, no service offered, no fear used"
    ]
  },

  {
    id: "t3p2-18",
    chapter: 4,
    source: "tutorial",
    sourceLabel: "Tutorial 3 Part 2",
    type: "mcq",
    question: "During a cybersecurity training session, employees were given a link to a website to learn about security threats. The site prompted them to enter their personal information to continue. This is an example of:",
    options: [
      "Scareware",
      "Baiting",
      "Pretexting",
      "Phishing",
      "Quid Pro Quo"
    ],
    answer: 3,
    explanation: "This is phishing. A link leads to a site that looks legitimate and official — a training resource — and that site prompts the user to reveal personal information. That is the definition of phishing: a fake but official-looking site used to trick users into handing over their details. The training context only makes the impersonation more convincing.",
    keyPoints: [
      "Official-looking site + prompt for personal information = phishing",
      "Trusted context makes the impersonation more effective",
      "No fear, no gift, no service offered in exchange"
    ]
  },


  /* ==================================================== CHAPTER 5 ======= */

  {
    id: "c5-01",
    chapter: 5,
    source: "tutorial",
    sourceLabel: "Summary — Ch 5",
    type: "mcq",
    question: "Why should Wikipedia not be used as an academic source?",
    options: [
      "Its content is not necessarily written by subject experts and may be incorrect",
      "It requires a paid subscription to access reliably",
      "Its articles are never updated once published",
      "It only covers scientific subjects"
    ],
    answer: 0,
    explanation: "The first reason given is that Wikipedia content is not necessarily written by subject experts and may simply be incorrect. The other two reasons are that articles may be changed or deleted between viewings, and that anyone can search Google or find Wikipedia — so to develop real academic skill you have to go beyond these basic tools.",
    keyPoints: [
      "Not necessarily written by subject experts; may be incorrect",
      "Articles may change or be deleted between viewings",
      "Anyone can find it — going beyond it is what develops academic skill"
    ]
  },

  {
    id: "c5-02",
    chapter: 5,
    source: "tutorial",
    sourceLabel: "Summary — Ch 5",
    type: "mcq",
    question: "Which of these is a stated problem with citing a Wikipedia article?",
    options: [
      "Wikipedia articles are too short to be useful",
      "The article may be changed or deleted between viewings",
      "Wikipedia does not allow its articles to be cited",
      "Wikipedia articles never include references"
    ],
    answer: 1,
    explanation: "Articles in Wikipedia may be changed or deleted between viewings, so what you cite today may not exist tomorrow — which makes it unstable as a reference. Wikipedia articles do include references, and that is precisely what makes them useful as a starting point: you follow the references and cite those instead.",
    keyPoints: [
      "Articles may be changed or deleted between viewings",
      "That instability is what makes them uncitable",
      "The references inside the article are the useful part"
    ]
  },

  {
    id: "c5-03",
    chapter: 5,
    source: "tutorial",
    sourceLabel: "Summary — Ch 5",
    type: "mcq",
    question: "What is the safe way to use Wikipedia?",
    options: [
      "Use it only for topics outside your own field of study",
      "Edit the article yourself so that you know it is correct",
      "Scan the article for general information and terms, then scan it for its references and follow those",
      "Copy the article and cite Wikipedia as the source"
    ],
    answer: 2,
    explanation: "The safe method has two steps: first scan the article to get general information and to learn the vocabulary and key terms of the topic; then scan it for its references, and go and read those. Wikipedia works as a map of a subject, not as a source you cite.",
    keyPoints: [
      "Step 1: scan for general information and key terms",
      "Step 2: scan for references, then read and cite those",
      "Use it as a starting point, never as the citation"
    ]
  },

  {
    id: "c5-04",
    chapter: 5,
    source: "tutorial",
    sourceLabel: "Summary — Ch 5",
    type: "mcq",
    question: "What is Google Scholar?",
    options: [
      "A free archive of two million articles in physics, mathematics and computer science",
      "An encyclopaedia that anyone can edit",
      "A tool for checking student work for plagiarism",
      "A service that provides a simple way to search for scholarly articles from one place"
    ],
    answer: 3,
    explanation: "Google Scholar provides a simple way to search for scholarly articles from one place. The free archive of around two million articles in physics, mathematics and computer science is arXiv — a different service, and an easy one to confuse with it in a multiple choice question.",
    keyPoints: [
      "A single place to search for scholarly articles",
      "Not the same as arXiv, which is an open-access archive",
      "Not an encyclopaedia and not a plagiarism checker"
    ]
  },

  {
    id: "c5-05",
    chapter: 5,
    source: "tutorial",
    sourceLabel: "Summary — Ch 5",
    type: "mcq",
    question: "Which of these is NOT a listed feature of Google Scholar?",
    options: [
      "Automatically writing your literature review for you",
      "Exploring related works, citations, authors and publications",
      "Locating the complete document across the web",
      "Checking who is citing your publication"
    ],
    answer: 0,
    explanation: "The listed features are: search all scholarly articles from one place; explore related works, citations, authors and publications; locate the complete document through the web; keep up with recent developments in any area of research; and check who is citing your publication. It finds and organises literature — it does not write anything for you.",
    keyPoints: [
      "Search all scholarly articles from one place",
      "Explore related works, citations, authors, publications",
      "Locate the complete document on the web",
      "Keep up with recent developments; see who cites you"
    ]
  },

  {
    id: "c5-06",
    chapter: 5,
    source: "tutorial",
    sourceLabel: "Summary — Ch 5",
    type: "mcq",
    question: "What is arXiv?",
    options: [
      "A citation manager for organising your references",
      "A free distribution service and open-access archive of around two million scholarly articles",
      "A commercial publisher that sells access to journal articles",
      "A search engine that indexes every scholarly article on the web"
    ],
    answer: 1,
    explanation: "arXiv is a free distribution service and open-access archive holding around two million scholarly articles in the fields of physics, mathematics, computer science and others. The key words are free and open-access — it distributes the articles themselves, rather than merely indexing them the way a search engine does.",
    keyPoints: [
      "A free distribution service and open-access archive",
      "Around two million scholarly articles",
      "Fields: physics, mathematics, computer science and others",
      "It holds the articles; Google Scholar searches for them"
    ]
  },

  {
    id: "c5-07",
    chapter: 5,
    source: "tutorial",
    sourceLabel: "Summary — Ch 5",
    type: "mcq",
    question: "Which fields does arXiv mainly cover?",
    options: [
      "Law and political science only",
      "Every academic field except the sciences",
      "Physics, mathematics, computer science and others",
      "Medicine and clinical trials only"
    ],
    answer: 2,
    explanation: "arXiv covers physics, mathematics, computer science and other fields. It began in physics and expanded outward, which is why the sciences dominate it. That subject focus is worth remembering, because it is what distinguishes arXiv from a general-purpose tool like Google Scholar.",
    keyPoints: [
      "Physics, mathematics, computer science and others",
      "Science-focused, unlike the general-purpose Google Scholar"
    ]
  },

  {
    id: "c5-08",
    chapter: 5,
    source: "tutorial",
    sourceLabel: "Summary — Ch 5",
    type: "mcq",
    question: "You are starting research on an unfamiliar topic. Which order of steps follows the advice in this chapter?",
    options: [
      "Cite Wikipedia first, then look for supporting articles afterwards",
      "Search only Google, because anything important will appear on the first page",
      "Avoid Wikipedia entirely and read nothing until you find a printed book",
      "Scan Wikipedia for terms and references, then search Google Scholar and arXiv for the actual articles"
    ],
    answer: 3,
    explanation: "The advice is to use Wikipedia as an orientation tool — scan it for general information, key terms and its references — and then move to proper scholarly sources such as Google Scholar and arXiv for the material you will actually read and cite. Wikipedia is not banned; it is simply not the destination.",
    keyPoints: [
      "Wikipedia first for vocabulary and references — never as the citation",
      "Google Scholar to find scholarly articles",
      "arXiv for free open-access articles in the sciences",
      "Going beyond Google and Wikipedia is what builds academic skill"
    ]
  },


  /* ==================================================== CHAPTER 6 ======= */

  {
    id: "c6-01",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What do cloud services do?",
    options: [
      "Shift computing activities from the user's desktop to computers on the internet",
      "Increase the processing power of the user's own desktop machine",
      "Provide a private network shared with third-party clients",
      "Encrypt data so that only the owner can read it"
    ],
    answer: 0,
    explanation: "Cloud services shift computing activities from the user's desktop to computers on the internet. Cloud computing frees end users from owning, maintaining and storing software programs and data, and provides access to those services from anywhere through an internet connection. A private network shared with third parties is an extranet, which is a different idea entirely.",
    keyPoints: [
      "Shifts computing from the desktop to computers on the internet",
      "Frees users from owning, maintaining and storing software and data",
      "Access from anywhere with an internet connection"
    ]
  },

  {
    id: "c6-02",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What are the three basic components of cloud computing?",
    options: [
      "Sensors, connectivity, and people and processes",
      "Clients, service providers and the internet",
      "SaaS, PaaS and IaaS",
      "Public, private and hybrid clouds"
    ],
    answer: 1,
    explanation: "The three essential elements of cloud computing are the clients (the end users), the service providers, and the internet as the medium connecting them. SaaS, PaaS and IaaS are the three service TYPES; public, private and hybrid are deployment MODELS; and sensors, connectivity and people/processes are the three parts of IoT. Four different triples in one chapter, so read the question carefully.",
    keyPoints: [
      "Clients — the end users",
      "Service providers",
      "The internet — the medium",
      "Do not confuse with SaaS/PaaS/IaaS or the deployment models"
    ]
  },

  {
    id: "c6-03",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "Which two factors determine the efficiency of cloud computing?",
    options: [
      "The number of service providers available, and the price of the subscription",
      "The choice of deployment model, and the choice of service type",
      "The speed and reliability of the user's internet, and the internet's capability to transmit data safely and reliably",
      "The processing power of the user's computer, and the size of its hard disk"
    ],
    answer: 2,
    explanation: "The two critical factors are the speed and reliability of the user's internet connection, and the internet's capability to provide safe and reliable transmission of data. Both are about the network rather than the user's own hardware — which makes sense, because the whole point of cloud computing is that the work has moved off the local machine.",
    keyPoints: [
      "The speed and reliability of the user's internet connection",
      "The internet's capability for safe and reliable data transmission",
      "Both factors concern the network, not the user's hardware"
    ]
  },

  {
    id: "c6-04",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "Which deployment model describes cloud infrastructure available to the general public or large organisations, owned and managed by the cloud provider?",
    options: [
      "Private cloud",
      "Community cloud",
      "Hybrid cloud",
      "Public cloud"
    ],
    answer: 3,
    explanation: "In the public cloud model the infrastructure is available to the general public or to large organisations, and it is managed and owned by the cloud provider. Private is dedicated to a single organisation, community is shared by several organisations with a common purpose, and hybrid is a mixture of two or more of these.",
    keyPoints: [
      "Available to the general public or large organisations",
      "Owned and managed by the cloud provider",
      "The other three models are private, hybrid and community"
    ]
  },

  {
    id: "c6-05",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "Which deployment model is dedicated to a single organisation and may be managed by that organisation or by a third party?",
    options: [
      "Private cloud",
      "Public cloud",
      "Community cloud",
      "Hybrid cloud"
    ],
    answer: 0,
    explanation: "The private cloud is dedicated to a single organisation, and it may be managed either by the organisation itself or by a third party. Note the detail that catches people out: private does not mean self-managed. A third party can run a private cloud — what makes it private is that only one organisation uses it.",
    keyPoints: [
      "Dedicated to a single organisation",
      "May be managed by the organisation or by a third party",
      "Private = exclusive use, not necessarily self-managed"
    ]
  },

  {
    id: "c6-06",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "Which deployment model is shared by several organisations for a specific community, allowing them to share data and environments?",
    options: [
      "Private cloud",
      "Community cloud",
      "Public cloud",
      "Hybrid cloud"
    ],
    answer: 1,
    explanation: "The community cloud is shared by several organisations belonging to a specific community, so that they can share data and environments between them. It sits between private (one organisation) and public (anybody): a defined group of organisations with something in common.",
    keyPoints: [
      "Shared by several organisations in a specific community",
      "Lets them share data and environments",
      "Between private (one organisation) and public (anyone)"
    ]
  },

  {
    id: "c6-07",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "What is a hybrid cloud?",
    options: [
      "A private cloud that has been sold to a public provider",
      "A cloud shared by several organisations in the same industry",
      "A mix of two or more types of cloud computing — both public and private",
      "A cloud that runs partly on the user's own desktop"
    ],
    answer: 2,
    explanation: "A hybrid cloud is a mixture of two or more types of cloud computing, combining both public and private. Organisations typically use it to keep sensitive workloads private while pushing less sensitive ones onto cheaper public infrastructure. A cloud shared by several organisations in an industry is the community model.",
    keyPoints: [
      "A mix of two or more cloud types",
      "Combines public and private",
      "Not the same as community, which is a shared group cloud"
    ]
  },

  {
    id: "c6-08",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "An organisation needs exclusive control over its sensitive data. Which cloud model is preferred?",
    options: [
      "Public",
      "Community",
      "Hybrid",
      "Private"
    ],
    answer: 3,
    explanation: "The private model is the one preferred by organisations needing exclusive control over their sensitive data, because the infrastructure is dedicated to that single organisation. Public shares infrastructure with everyone, community shares it with a defined group, and hybrid only keeps part of the workload private.",
    keyPoints: [
      "Private = exclusive control over sensitive data",
      "Dedicated to a single organisation",
      "Directly addresses the security-in-the-cloud disadvantage"
    ]
  },

  {
    id: "c6-09",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What are the three types of cloud computing services?",
    options: [
      "SaaS, PaaS and IaaS",
      "AWS, Azure and Alibaba Cloud",
      "Public, private and hybrid",
      "Clients, service providers and the internet"
    ],
    answer: 0,
    explanation: "The three types of cloud computing services are SaaS (Software as a Service), PaaS (Platform as a Service) and IaaS (Infrastructure as a Service). AWS, Azure and Alibaba Cloud are PROVIDERS, not service types — a very common wrong answer, and one that appears in the tutorial sheet itself. Public, private and hybrid are deployment models, and clients/providers/internet are the three basic components.",
    keyPoints: [
      "SaaS — Software as a Service",
      "PaaS — Platform as a Service",
      "IaaS — Infrastructure as a Service",
      "AWS / Azure / Alibaba are providers, NOT service types"
    ]
  },

  {
    id: "c6-10",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "What does SaaS provide?",
    options: [
      "A private network for the organisation's own employees",
      "The ability to use the provider's software application over the internet by subscription, accessible from anywhere via the web",
      "A platform on which the client deploys and hosts their own applications",
      "Just the hardware and the network, on which the client installs everything else"
    ],
    answer: 1,
    explanation: "SaaS — Software as a Service — provides clients with the ability to use the provider's software application over the internet via subscription, and clients can access it from anywhere via the web. Examples are Google applications and Salesforce. The client manages nothing beyond using the software.",
    keyPoints: [
      "Use the provider's software over the internet, by subscription",
      "Accessible from anywhere via the web",
      "Examples: Google applications, Salesforce",
      "The client manages nothing"
    ]
  },

  {
    id: "c6-11",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What does PaaS provide?",
    options: [
      "Bare hardware and network on which the client installs the operating system and everything above it",
      "A shared environment for several organisations in the same community",
      "A platform where clients deploy and host their own applications without managing infrastructure, storage, servers or network",
      "Finished software the client simply subscribes to and uses"
    ],
    answer: 2,
    explanation: "PaaS — Platform as a Service — provides a platform on which clients can deploy their own applications and host them, freeing them from the hassle of setting up infrastructure and managing storage, servers and network. Examples given are Amazon Web Services and Microsoft Azure. The client still writes and deploys the application; they just do not manage what it runs on.",
    keyPoints: [
      "A platform for deploying and hosting the client's own applications",
      "No need to manage infrastructure, storage, servers or network",
      "Examples: Amazon Web Services, Microsoft Azure",
      "The client still builds the application"
    ]
  },

  {
    id: "c6-12",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What does IaaS provide?",
    options: [
      "A complete application the client accesses by subscription",
      "A managed platform that removes all infrastructure concerns",
      "Analytics reporting on how a website is being used",
      "Just the hardware and network — the client installs and develops the software and applications"
    ],
    answer: 3,
    explanation: "IaaS — Infrastructure as a Service — provides just the hardware and the network; the client is responsible for installing and developing the software and applications on top of it. Examples given are Amazon AWS and IBM. Think of the three service types as a ladder of how much the client still has to do: SaaS nothing, PaaS build the application, IaaS install everything.",
    keyPoints: [
      "Provides only hardware and network",
      "The client installs and develops the software",
      "Examples: Amazon AWS, IBM",
      "Most client responsibility of the three service types"
    ]
  },

  {
    id: "c6-13",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "A company rents servers and network capacity from a provider and installs its own operating system and applications on them. Which service type is this?",
    options: [
      "IaaS",
      "SaaS",
      "PaaS",
      "Community cloud"
    ],
    answer: 0,
    explanation: "This is IaaS, because the provider is supplying only the hardware and network and the client is installing and developing everything above that. If the provider had supplied a ready-made platform to deploy applications onto, it would be PaaS; if the client were simply subscribing to finished software, it would be SaaS. Community cloud is a deployment model, not a service type, so it cannot be the answer to this question at all.",
    keyPoints: [
      "Hardware and network only, client installs the rest = IaaS",
      "Ready-made deployment platform = PaaS",
      "Finished software by subscription = SaaS",
      "Community cloud is a deployment model, not a service type"
    ]
  },

  {
    id: "c6-14",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "Which of the following is an advantage of cloud computing?",
    options: [
      "Freedom to move your data to a competitor at no cost",
      "Backup and recovery, with 24/7 availability and quick deployment",
      "Complete independence from your internet connection",
      "Full legal control over where your data is stored"
    ],
    answer: 1,
    explanation: "The listed advantages include cost efficiency, backup and recovery, automated software updates, 24/7 availability, security, quick deployment and easy access to information; the tutorial adds almost unlimited storage and scalability. The three wrong options are actually disadvantages in disguise: cloud computing depends entirely on your connection, legislation and regulation limit your control over storage location, and inflexibility means moving away is hard.",
    keyPoints: [
      "Cost efficiency; backup and recovery; automated updates",
      "24/7 availability; security; quick deployment; easy access",
      "Also: almost unlimited storage, and flexibility/scalability",
      "Full definitions of each advantage are on slide 15"
    ]
  },

  {
    id: "c6-15",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What does automatic software integration mean as an advantage of cloud computing?",
    options: [
      "Applications automatically move between public and private clouds",
      "The user's data is automatically encrypted before upload",
      "The server regularly updates software, including security, so no user involvement in maintenance is needed",
      "Different cloud providers can be combined into one account"
    ],
    answer: 2,
    explanation: "Automatic software integration, also described as automated software updates, means the server regularly updates the software including its security, so there is no need for user involvement in system maintenance. It is one of the reasons cloud computing lowers the burden on the client — the maintenance work moves to the provider along with the computing.",
    keyPoints: [
      "The server updates the software regularly",
      "Security updates included",
      "No user involvement in system maintenance"
    ]
  },

  {
    id: "c6-16",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "Which of the following is a disadvantage of cloud computing?",
    options: [
      "Software must be updated manually by the user",
      "It requires the organisation to buy and maintain its own servers",
      "It cannot be accessed from more than one device",
      "Prone to attack — storing information in the cloud leaves the client vulnerable to external hacking"
    ],
    answer: 3,
    explanation: "The listed disadvantages are technical issues, security in the cloud, inflexibility, being prone to attack, and legislation and regulation; the tutorial adds possible downtime. The wrong options invert genuine advantages: updates are automatic, the organisation avoids owning hardware, and access from any connected device is a selling point.",
    keyPoints: [
      "Technical issues",
      "Security in the cloud — sensitive data is handed to a third party",
      "Inflexibility — vendor lock-in",
      "Prone to attack; legislation and regulation; possible downtime",
      "Full definitions of each disadvantage are on slide 16"
    ]
  },

  {
    id: "c6-17",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "Why is inflexibility listed as a disadvantage of cloud computing?",
    options: [
      "Choosing a provider locks the business into their proprietary applications and formats",
      "Cloud resources cannot be increased or decreased once purchased",
      "Cloud applications cannot be used on mobile devices",
      "The provider decides which employees may use the service"
    ],
    answer: 0,
    explanation: "Inflexibility means that choosing a cloud computing vendor often locks the business into that vendor's proprietary applications and formats, making it difficult and expensive to move later. Note that this is not the same as scalability: the ability to increase or decrease resources on demand is listed as an ADVANTAGE, so do not confuse the two.",
    keyPoints: [
      "Vendor lock-in to proprietary applications and formats",
      "Makes moving to another provider difficult",
      "Not the same as scalability, which is an advantage"
    ]
  },

  {
    id: "c6-18",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "Why is security listed as a disadvantage of cloud computing?",
    options: [
      "Cloud data can never be backed up",
      "Users surrender their company's sensitive information to a third-party provider",
      "Cloud providers are legally forbidden from encrypting customer data",
      "Cloud systems cannot use firewalls"
    ],
    answer: 1,
    explanation: "By using cloud services, users are surrendering their company's sensitive information to a third-party provider, which could potentially increase security risk. The risk is one of custody rather than technology: the data is now somewhere you do not control. This is exactly why organisations needing exclusive control over sensitive data prefer the private cloud model.",
    keyPoints: [
      "Sensitive information is handed to a third-party provider",
      "The risk is loss of custody and control",
      "Private cloud is the standard response to this concern"
    ]
  },

  {
    id: "c6-19",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What is the Internet of Things?",
    options: [
      "A private internal network used by an organisation's employees",
      "The evolution of the web into a semantic, machine-readable data space",
      "Extending the internet beyond computers and smartphones to everyday devices that collect and send data without human intervention",
      "A network of servers that store data on behalf of end users"
    ],
    answer: 2,
    explanation: "IoT is about extending the power of the internet beyond computers and smartphones to a whole range of other things, processes and environments — connecting everyday devices so they can collect and send data over a wireless network without a person having to do it manually. The distractors are cloud computing, an intranet and Web 3.0 respectively.",
    keyPoints: [
      "Extends the internet beyond computers and smartphones",
      "Everyday objects embedded with sensors and software",
      "They collect and send data over a network",
      "No human intervention required"
    ]
  },

  {
    id: "c6-20",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "In IoT, which part is described as acting like a digital nervous system?",
    options: [
      "Connectivity",
      "People and processes",
      "The cloud provider",
      "Sensors"
    ],
    answer: 3,
    explanation: "Sensors act as the digital nervous system, collecting data from the real world — GPS for location, cameras and microphones for sight and sound, and sensors for temperature, motion and so on. The other two parts are connectivity, which digitises the data and sends it over a network, and people and processes, where the data is used to make better decisions.",
    keyPoints: [
      "Sensors = the digital nervous system",
      "GPS, cameras, microphones, temperature and motion sensors",
      "The three IoT parts: sensors, connectivity, people and processes"
    ]
  },

  {
    id: "c6-21",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "In the three parts of IoT, what happens in the People and Processes stage?",
    options: [
      "The data is used in systems where information flows both ways, combining data, people and processes to make better decisions",
      "The raw data is collected from the physical environment",
      "The data is converted into digital form and sent over a network",
      "The data is encrypted before being stored in the cloud"
    ],
    answer: 0,
    explanation: "In the people and processes stage, the collected data is used in systems where information flows back and forth — two-way — combining data, people and processes together to make better decisions. Collection is the sensors stage and digitisation and transmission is the connectivity stage; this third stage is where the data finally becomes useful.",
    keyPoints: [
      "Data is put to use in decision-making",
      "Information flows both ways — it is two-way",
      "Combines data, people and processes",
      "Stage 1 sensors → stage 2 connectivity → stage 3 people and processes"
    ]
  },

  {
    id: "c6-22",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "A smart refrigerator senses that the milk is low, sends that data over the network, and adds milk to your shopping list automatically. What does this illustrate?",
    options: [
      "Predictive analytics, because it forecasts what you will need",
      "All three parts of IoT working together — sensors, connectivity, and people and processes",
      "Software as a Service, because the shopping list is an online application",
      "A community cloud, because the fridge shares data with the shop"
    ],
    answer: 1,
    explanation: "This is the standard IoT example and it runs through all three parts: the sensor detects that the milk is low, connectivity sends that data over the network, and the people-and-processes stage acts on it by updating the shopping list. The defining feature is that all of it happens without you doing anything manually.",
    keyPoints: [
      "Sensor detects → connectivity transmits → process acts",
      "No human intervention at any stage",
      "The textbook IoT example"
    ]
  },

  {
    id: "c6-23",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What are web analytics?",
    options: [
      "The process of designing and hosting a website",
      "The use of algorithms to make websites machine-readable",
      "The collection, reporting and analysis of website data",
      "The encryption of website traffic between browser and server"
    ],
    answer: 2,
    explanation: "Web analytics is the collection, reporting and analysis of website data, and it matters because it identifies what users are actually doing on your website. The standard tool named is Google Analytics. Making websites machine-readable is a Web 3.0 idea, and designing and hosting are Chapter 2 topics.",
    keyPoints: [
      "Collection, reporting and analysis of website data",
      "Purpose: identify what users are doing on your site",
      "Standard tool: Google Analytics"
    ]
  },

  {
    id: "c6-24",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "Which are the three types of web analytics data?",
    options: [
      "Descriptive, predictive and prescriptive data",
      "Sensors, connectivity, and people and processes",
      "Accuracy, property and access",
      "Audience data, audience behaviour and campaign data"
    ],
    answer: 3,
    explanation: "The three types are audience data — for example the number of visits; audience behaviour — for example the most frequently visited pages; and campaign data — which campaigns drove the most traffic. Descriptive, predictive and prescriptive are the three types of ANALYTICS, which is a related but different list in the same chapter.",
    keyPoints: [
      "Audience data — who is coming, e.g. number of visits",
      "Audience behaviour — what they do, e.g. most visited pages",
      "Campaign data — where they came from, e.g. best-performing campaigns",
      "Different from descriptive/predictive/prescriptive analytics"
    ]
  },

  {
    id: "c6-25",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "Which analytics type uses algorithms and AI to suggest specific actions to take?",
    options: [
      "Prescriptive analytics",
      "Descriptive analytics",
      "Predictive analytics",
      "Audience behaviour analytics"
    ],
    answer: 0,
    explanation: "Prescriptive analytics goes a step beyond prediction, using algorithms and AI to suggest specific actions that take advantage of the predictions. Descriptive analytics looks at historical data to understand past performance — what happened; predictive analytics uses historical data, statistical models and machine learning to forecast future trends — what is likely to happen.",
    keyPoints: [
      "Descriptive — what happened (historical data, past performance)",
      "Predictive — what is likely to happen (models, machine learning)",
      "Prescriptive — what to do about it (algorithms and AI suggest actions)"
    ]
  },

  {
    id: "c6-26",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What is blockchain?",
    options: [
      "A collection of data sets too large for traditional processing tools",
      "A system of recording information in a way that makes it difficult or impossible to change, hack or cheat the system",
      "A method of encrypting files so that only the key holder can read them",
      "A network of physical objects that collect and share data"
    ],
    answer: 1,
    explanation: "Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack or cheat the system, and it is a type of database. The distractors are encryption, IoT and big data — three other Chapter 6 concepts that are easy to blur together under exam pressure.",
    keyPoints: [
      "A system of recording information",
      "Makes it difficult or impossible to change, hack or cheat",
      "It is a type of database"
    ]
  },

  {
    id: "c6-27",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Summary — Ch 6",
    type: "mcq",
    question: "What is the difference between a blockchain and a conventional database?",
    options: [
      "A blockchain can only store financial records; a database can store anything",
      "A blockchain is encrypted; a database never is",
      "A blockchain collects information in groups called blocks; a database structures its data into tables",
      "A blockchain stores data in the cloud; a database stores data locally"
    ],
    answer: 2,
    explanation: "The examinable difference is in the way the data is structured. A blockchain collects information together in groups known as blocks, each holding a set of information, whereas a database structures its data into tables. That structural difference is what makes blockchain records chained and effectively immutable, while database records can be edited by whoever holds the rights.",
    keyPoints: [
      "The difference is how the data is structured",
      "Blockchain → blocks holding sets of information",
      "Database → tables",
      "Consequence: blockchain records are effectively immutable"
    ]
  },

  {
    id: "c6-28",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "How is artificial intelligence defined?",
    options: [
      "Any software that automates a repetitive task",
      "A database that stores information in blocks rather than tables",
      "The collection and analysis of website visitor data",
      "Intelligent systems with the ability to think and learn, which can augment human work"
    ],
    answer: 3,
    explanation: "AI is defined as intelligent systems with the ability to think and learn, and it can augment human work. It includes natural language processing, machine learning and machine vision. Neural networks are a related term: machine learning and AI models that simulate the way biological neural networks in the human brain work, in order to model complex problems.",
    keyPoints: [
      "Intelligent systems able to think and learn",
      "Can augment human work",
      "Includes natural language processing, machine learning, machine vision",
      "Neural networks simulate biological brain networks to model complex problems"
    ]
  },

  {
    id: "c6-29",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "What is big data?",
    options: [
      "A collection of data sets so large and complex that it becomes difficult to process using on-hand database management tools or traditional data processing applications",
      "Any data set larger than one gigabyte",
      "Data that has been collected without the subject's consent",
      "Data stored in the cloud rather than on a local machine"
    ],
    answer: 0,
    explanation: "Big data is the term for a collection of data sets so large and complex that it becomes difficult to process using on-hand database management tools or traditional data processing applications. Note that the definition is relative, not a fixed size — it is defined by exceeding the capability of ordinary tools, not by crossing a particular number of gigabytes.",
    keyPoints: [
      "Data sets so large and complex that ordinary tools cannot process them",
      "Defined relative to on-hand tools, not by a fixed size",
      "More detail is on slides 39–51"
    ]
  },

  {
    id: "c6-30",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "Why is big data challenging to process with traditional database management tools?",
    options: [
      "Because big data can only be processed by blockchain systems",
      "Because of the difficulty of capture, curation, storage, search, sharing, transfer, analysis and visualisation at that scale",
      "Because traditional tools cannot read text data at all",
      "Because big data is always stored in an encrypted form"
    ],
    answer: 1,
    explanation: "The challenges include capture, curation, storage, search, sharing, transfer, analysis and visualisation. Traditional tools were designed for data that fits on one machine and arrives at a manageable rate, so big data does not break any single operation — it breaks all of them at once, on scale.",
    keyPoints: [
      "Challenges: capture, curation, storage, search, sharing, transfer, analysis, visualisation",
      "Traditional tools assume manageable volume and rate",
      "Big data fails on scale across every operation at once"
    ]
  },

  {
    id: "c6-31",
    chapter: 6,
    source: "tutorial",
    sourceLabel: "Tutorial 4",
    type: "mcq",
    question: "How does big data differ from small data in terms of characteristics?",
    options: [
      "Small data is structured while big data is always unstructured text",
      "Small data is collected with consent while big data is collected without it",
      "Small data is manageable and can be handled with on-hand tools; big data exceeds those tools in size and complexity, making capture, storage, analysis and visualisation difficult",
      "Small data is stored locally while big data is always stored in the cloud"
    ],
    answer: 2,
    explanation: "The difference follows directly from the definition of big data. Small data is small and simple enough to be handled by ordinary on-hand database management tools and traditional data processing applications: it fits comfortably, one person can read and understand it, and a conventional table structure holds it. Big data is defined by exceeding exactly those limits — it is so large and complex that ordinary tools cannot cope, and the difficulty appears across capture, curation, storage, search, sharing, transfer, analysis and visualisation. Note that the tutorial sheet left this question blank; this answer is derived from the definition in the summary.",
    keyPoints: [
      "Size — small data is manageable; big data is so large it becomes difficult to handle",
      "Complexity — small data is simple and usually structured; big data is complex and varied",
      "Tools — on-hand tools suffice for small data; big data defeats traditional processing",
      "Difficulty — big data is hard across capture, storage, search, transfer, analysis and visualisation"
    ]
  },

];
