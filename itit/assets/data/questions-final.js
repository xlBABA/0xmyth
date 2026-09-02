/* ==========================================================================
   questions-final.js
   Final exam bank for BIC1234 / CC106 — the May–Sept 2025 paper, the
   official revision sheet, and the additional task.

   Almost all of this is open-ended: theory and code writing. Open-ended
   questions are NEVER graded. The user writes an answer, reveals the model
   answer, and compares the two. No score, no verdict.

   Multi-part questions are SPLIT — revision Q6's eleven protocols and
   Q11's nine code examples are eleven and nine separate questions, so each
   one can be drilled on its own. Where the exam paper, the revision sheet
   and the additional task ask the same thing, the question is stored once,
   lists every source in `papers`, and carries `repeats`.

   Chapter numbering for this course: HTML is Chapter 8, CSS is Chapter 9,
   JavaScript is Chapter 10. The "Chapter 7" label in the scope note on the
   revision sheet is wrong; nothing here is tagged 7.

   Code samples are stored as plain JS strings and rendered with textContent,
   never innerHTML — otherwise the browser would parse the sample as real
   markup and it would vanish. Because this file is loaded via <script src>,
   a literal closing script tag inside a string is safe. Do not inline it.
   ========================================================================== */

const FINAL_QUESTIONS = [

  /* ===================================== PROTOCOLS AND ABBREVIATIONS ===== */
  /* Final paper Q1(c) asked six of these for their full names; revision Q6
     and additional task Q6 ask all eleven for full name AND role. Stored
     once each, split one question per abbreviation. */

  {
    id: "fin-proto-smtp",
    chapter: 3,
    source: "final",
    sourceLabel: "Final paper Q1(c)(i) · Revision Q6(a) · Additional Q6(a)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does SMTP stand for, and what is its role?",
    modelAnswer: "SMTP stands for Simple Mail Transfer Protocol.\n\nIts role is to decide which paths an email message will take on the Internet. When the sender clicks send, the mail client hands the message to the SMTP server of the sender's email service provider. That server checks whether the recipient's domain is the same as the sender's: if it is, the message is redirected internally; if it is not, the SMTP server queries a DNS server for the IP address of the recipient's mail server and sends the message across the Internet to it.\n\nSMTP is therefore the outgoing, server-to-server protocol. POP and IMAP are the incoming protocols that retrieve the message afterwards.",
    keyPoints: [
      "Simple Mail Transfer Protocol",
      "Decides which paths an email message takes on the Internet",
      "Outgoing / sending, server to server",
      "Queries DNS when the recipient's domain differs from the sender's"
    ],
    repeats: 4
  },

  {
    id: "fin-proto-pop",
    chapter: 3,
    source: "final",
    sourceLabel: "Final paper Q1(c)(ii) · Revision Q6(c) · Additional Q6(c)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does POP stand for, and what is its role?",
    modelAnswer: "POP stands for Post Office Protocol.\n\nIts role is to handle incoming messages: it retrieves mail from the recipient's mailbox on the mail server and downloads it onto the local device so that it can be read there.\n\nBecause POP pulls the messages down to one machine, it suits a single device and is little used today. IMAP is the modern alternative — it also retrieves mail, but lets the client read it on the server without downloading it, so the same mailbox looks the same from several devices.",
    keyPoints: [
      "Post Office Protocol",
      "Handles incoming messages",
      "Downloads mail from the server to the local device",
      "Contrast with IMAP, which leaves the mail on the server"
    ],
    repeats: 4
  },

  {
    id: "fin-proto-tcpip",
    chapter: 1,
    source: "final",
    sourceLabel: "Final paper Q1(c)(iii) · Revision Q6(d) · Additional Q6(d)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does TCP/IP stand for, and what is its role?",
    modelAnswer: "TCP/IP stands for Transmission Control Protocol / Internet Protocol.\n\nIts role is to be the set of protocols that allows cooperating computers to share resources across a network. It is the foundation the whole Internet is built on.\n\nThe two halves do different jobs. TCP breaks data into packets, guarantees that they arrive accurately and in the correct order, and reassembles them at the far end. IP handles addressing and routing — getting each packet to the right machine — but makes no promise about the order they arrive in.\n\nIn the seven steps of how the Internet works, TCP/IP is the step where the web server sends the page back to you in packets and IP ensures they reach you.",
    keyPoints: [
      "Transmission Control Protocol / Internet Protocol",
      "A set of protocols letting cooperating computers share resources across a network",
      "TCP: reliable, ordered delivery",
      "IP: addressing and routing, no ordering guarantee"
    ],
    repeats: 4
  },

  {
    id: "fin-proto-http",
    chapter: 2,
    source: "final",
    sourceLabel: "Final paper Q1(c)(iv) · Revision Q6(e) · Additional Q6(e)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does HTTP stand for, and what is its role?",
    modelAnswer: "HTTP stands for HyperText Transfer Protocol.\n\nIts role is to provide the set of rules for exchanging files — text, graphics, images, sound, video and others — on the World Wide Web, and so to connect computers together on the web.\n\nIt works as request and response: the browser (the client) sends an HTTP request for a page, and the web server finds that document and sends it back in an HTTP response. HTTP is step five of the seven steps of how the Internet works — after DNS has resolved the name and the ISP has carried the request, HTTP is what actually asks for the home page.\n\nHTTPS is the same protocol with the connection encrypted.",
    keyPoints: [
      "HyperText Transfer Protocol",
      "Rules for exchanging files (text, graphics, images, sound, video) on the WWW",
      "Request/response between browser and web server",
      "HTTPS is HTTP over an encrypted connection"
    ],
    repeats: 4
  },

  {
    id: "fin-proto-imap",
    chapter: 3,
    source: "final",
    sourceLabel: "Final paper Q1(c)(v) · Revision Q6(g) · Additional Q6(g)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does IMAP stand for, and what is its role?",
    modelAnswer: "IMAP stands for Internet Message Access Protocol.\n\nIts role is retrieving mail messages from a server. Like POP it is an incoming protocol used by the mail client, but the difference is where the message lives: IMAP lets the client read the message on the server without downloading it to the local device.\n\nThat is why IMAP is what people use now. The mailbox stays on the server, so the same mail, the same folders and the same read/unread state appear on your phone, your laptop and the webmail page. With POP the message is pulled down to one machine and the others never see it.",
    keyPoints: [
      "Internet Message Access Protocol",
      "Retrieves mail messages from a server",
      "Reads mail on the server rather than downloading it",
      "Keeps one mailbox consistent across several devices — unlike POP"
    ],
    repeats: 4
  },

  {
    id: "fin-proto-mime",
    chapter: 3,
    source: "final",
    sourceLabel: "Final paper Q1(c)(vi) · Revision Q6(h) · Additional Q6(h)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does MIME stand for, and what is its role?",
    modelAnswer: "MIME stands for Multipurpose Internet Mail Extensions.\n\nIts role is to specify how to encode non-text data — such as graphics and sounds — so that the data can travel over the Internet in an email.\n\nEmail was originally designed to carry plain text only. MIME is what makes an attachment possible: it encodes the image, the sound file or the PDF into a form that a plain-text mail system can carry, and labels it with a content type so that the receiving mail client knows what it is and how to turn it back into the original file.",
    keyPoints: [
      "Multipurpose Internet Mail Extensions",
      "Specifies how to encode non-text data such as graphics and sounds",
      "Lets email carry attachments even though mail is a plain-text medium",
      "Labels content with a type so the receiving client can decode it"
    ],
    repeats: 4
  },

  {
    id: "fin-proto-vpn",
    chapter: 4,
    source: "final",
    sourceLabel: "Revision Q6(b) · Additional Q6(b)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does VPN stand for, and what is its role?",
    modelAnswer: "VPN stands for Virtual Private Network.\n\nIts role is to provide an encrypted connection across a network that cannot be trusted. It is listed in the notes as one of the cases of encryption, alongside email, files, websites and wireless networks.\n\nA VPN builds a private, encrypted tunnel between your device and a VPN server. Everything you send goes through that tunnel, so anyone watching the network in between — the operator of a public Wi-Fi hotspot, or a rogue hotspot imitating a legitimate one — sees only unreadable traffic. That is exactly why the recommended step for protecting your privacy on public Wi-Fi is to use a VPN.",
    keyPoints: [
      "Virtual Private Network",
      "Creates an encrypted connection over an untrusted network",
      "One of the cases of encryption in the notes",
      "The recommended protection on public Wi-Fi"
    ],
    repeats: 2
  },

  {
    id: "fin-proto-dns",
    chapter: 2,
    source: "final",
    sourceLabel: "Revision Q6(f) · Additional Q6(f)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does DNS stand for, and what is its role?",
    modelAnswer: "DNS stands for Domain Name System.\n\nIts role is to translate domain names that people can read into the IP addresses that machines actually route to. When you type www.google.com, DNS turns it into an address such as 100.120.12.3, and only then can the request be sent onwards.\n\nIt is step two of the seven steps of how the Internet works, immediately after you type the address. DNS also appears in the email process: when an SMTP server finds that the recipient's domain differs from the sender's, it queries DNS to find the IP address of the recipient's mail server.",
    keyPoints: [
      "Domain Name System",
      "Translates domain names into IP addresses",
      "Step 2 of how the Internet works",
      "Also used by SMTP to locate the recipient's mail server"
    ],
    repeats: 2
  },

  {
    id: "fin-proto-isp",
    chapter: 1,
    source: "final",
    sourceLabel: "Revision Q6(i) · Additional Q6(i)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does ISP stand for, and what is its role?",
    modelAnswer: "ISP stands for Internet Service Provider.\n\nIts role is to connect users to the Internet. The ISP supplies the physical connection into your home or office, sends your requests out onto the Internet, and carries the responses back to you. STC is an example.\n\nIt is step three of the seven steps of how the Internet works: you type the address, DNS resolves it, and then your ISP connects you and forwards the request. Where the traffic must cross between different providers, a NAP (Network Access Point) helps exchange it and route it on to the web server.\n\nAccessing the Internet needs three things: a device, an ISP for the physical connection, and a modem or router at your end.",
    keyPoints: [
      "Internet Service Provider",
      "Provides the physical connection to the Internet",
      "Forwards requests out and carries responses back",
      "NAPs exchange traffic between different ISPs"
    ],
    repeats: 2
  },

  {
    id: "fin-proto-url",
    chapter: 1,
    source: "final",
    sourceLabel: "Revision Q6(j) · Additional Q6(j)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does URL stand for, and what is its role?",
    modelAnswer: "URL stands for Uniform Resource Locator.\n\nIts role is to be the unique address of every web page on the Internet — a standard way of expressing both the location of a resource and the way it should be fetched. In general it takes the form protocol://address, where the protocol is something like HTTP, FTP or telnet, and the address is the server name of the resource.\n\nExample: https://www.example.edu/courses/notes.html\n\n- https:// — the protocol, the rules the browser must use\n- www.example.edu — the domain name of the server, which DNS resolves to an IP address\n- /courses/notes.html — the path to the particular document on that server\n\nIf the question is worth more marks, add the optional parts: the port number, a query string of name=value pairs after a question mark, and a fragment after a hash that points at a section inside the page.",
    keyPoints: [
      "Uniform Resource Locator",
      "The unique address of every web page on the Internet",
      "General form protocol://address",
      "Parts: protocol, domain name, path, and optionally port, query string, fragment"
    ],
    repeats: 2
  },

  {
    id: "fin-proto-ftp",
    chapter: 2,
    source: "final",
    sourceLabel: "Revision Q6(k) · Additional Q6(k)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 2,
    question: "What does FTP stand for, and what is its role?",
    modelAnswer: "FTP stands for File Transfer Protocol.\n\nIts role is to be the standard used to transfer files over the Internet. It lets you copy any kind of computer file from one computer to another.\n\nWhere HTTP is for requesting and displaying documents in a browser, FTP is for moving whole files between machines — which is why it is the traditional way of uploading a finished website onto the web server that will host it.",
    keyPoints: [
      "File Transfer Protocol",
      "The standard for transferring files over the Internet",
      "Copies any kind of computer file from one computer to another",
      "Contrast with HTTP, which requests documents for display"
    ],
    repeats: 2
  },

  /* =========================================== CONCEPT DEFINITIONS ======= */

  {
    id: "fin-def-iot",
    chapter: 6,
    source: "final",
    sourceLabel: "Revision Q1(a) · Additional Q2(a)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 3,
    question: "Define the term IoT (Internet of Things).",
    modelAnswer: "The Internet of Things is about extending the power of the Internet beyond computers and smartphones to a whole range of other things, processes and environments. It is the idea of connecting everyday devices to the Internet so that they can collect and send data over a wireless network without a person doing it manually.\n\nIt works through three main parts:\n\n- Sensors — a “digital nervous system” collecting data from the real world: GPS for location, cameras and microphones for sight and sound, and sensors for temperature, motion and so on.\n- Connectivity — the collected data is turned into digital form and sent over a network such as Wi-Fi or cellular.\n- People and processes — the data is fed into systems where information flows both ways, combining data, people and processes to make better decisions.\n\nExample: a smart refrigerator senses that the milk is low, sends that data over the network, and adds milk to your shopping list automatically — without you doing anything.",
    keyPoints: [
      "Extends the Internet beyond computers and phones to everyday things",
      "Devices collect and send data without manual human action",
      "Three parts: sensors, connectivity, people and processes",
      "Example: a smart fridge that reorders milk by itself"
    ],
    repeats: 3
  },

  {
    id: "fin-def-bigdata",
    chapter: 6,
    source: "final",
    sourceLabel: "Final paper Q2(b)(ii) · Revision Q1(b) · Additional Q2(b)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 3,
    question: "Define / illustrate the term Big Data.",
    modelAnswer: "Big data is the term for a collection of data sets so large and complex that it becomes difficult to process using on-hand database management tools or traditional data processing applications.\n\nThe definition is about exceeding your tools, not about a fixed size. The difficulty appears right across the pipeline: capture, curation, storage, search, sharing, transfer, analysis and visualisation.\n\nThat is also what separates it from small data. Small data is manageable — it fits comfortably, a person can read and understand it, and an ordinary table structure holds it. Big data defeats exactly those things at once.\n\nIllustration: the stream of every click, search and video watched by a billion users of a platform in one day. No single spreadsheet, and no single ordinary database, can hold it or query it in reasonable time, so it has to be stored and analysed with specialised distributed tools.",
    keyPoints: [
      "Data sets so large and complex that on-hand tools cannot process them",
      "Defined by exceeding traditional tools, not by a fixed size",
      "Challenges: capture, curation, storage, search, sharing, transfer, analysis, visualisation",
      "Small data is manageable with ordinary tools; big data is not"
    ],
    repeats: 4
  },

  {
    id: "fin-def-green",
    chapter: 6,
    source: "final",
    sourceLabel: "Revision Q1(c) · Additional Q2(c)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 3,
    question: "Define the term Green Computing.",
    modelAnswer: "Green computing is the environmentally responsible use of computers and computing resources: designing, manufacturing, using and disposing of computers, servers and related devices in a way that minimises their impact on the environment.\n\nIn practice it covers four things:\n\n- Energy efficiency — using hardware and settings that draw less power, and shutting down or sleeping equipment that is idle.\n- Reducing waste — extending the life of equipment, and recycling or safely disposing of e-waste rather than sending it to landfill.\n- Responsible manufacturing — using fewer hazardous materials and less energy to build the equipment in the first place.\n- Virtualisation and cloud computing — sharing pooled resources in a data centre instead of every organisation running its own under-used servers, which cuts the total number of machines being powered and cooled.\n\nThe link to cloud computing is the one most likely to be asked alongside this: pooling resources reduces the overall carbon footprint.\n\nNote: green computing is not covered in the Chapters 1–6 summary sheet, so check this definition against the wording on your lecture slides before relying on it.",
    keyPoints: [
      "Environmentally responsible design, manufacture, use and disposal of computing equipment",
      "Energy efficiency and reduced power consumption",
      "Reducing e-waste through longer life and recycling",
      "Virtualisation and cloud computing reduce the total carbon footprint",
      "Not in the summary sheet — verify against the slides"
    ],
    repeats: 2
  },

  {
    id: "fin-def-ai",
    chapter: 6,
    source: "final",
    sourceLabel: "Revision Q1(d) · Additional Q2(d)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 3,
    question: "Define the term AI (Artificial Intelligence).",
    modelAnswer: "Artificial Intelligence can be defined as intelligent systems with the ability to think and learn.\n\nIt is used to augment human work rather than only to replace it, and the notes give three of its main areas:\n\n- Natural language processing — understanding and producing human language.\n- Machine learning — improving performance at a task by learning from data rather than by being programmed with explicit rules.\n- Machine vision — interpreting images and video.\n\nAI is also what makes the Semantic Web (Web 3.0) meaningful: once data is interconnected and machine-readable, advanced algorithms can process the content itself and produce smarter search engines and similar applications.",
    keyPoints: [
      "Intelligent systems with the ability to think and learn",
      "Augments human work",
      "Areas: natural language processing, machine learning, machine vision",
      "Underpins the Semantic Web / Web 3.0"
    ],
    repeats: 3
  },

  {
    id: "fin-def-cloud",
    chapter: 6,
    source: "final",
    sourceLabel: "Final paper Q2(b)(i) · Revision Q1(e) · Additional Q2(e)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 3,
    question: "Define / illustrate the term Cloud Computing.",
    modelAnswer: "Cloud computing shifts computing activities from the user's desktop to computers on the Internet. It frees end users from owning, maintaining and storing software and data, and gives them access to those services from anywhere with an Internet connection.\n\nIts three basic components are:\n\n- Clients — the end users.\n- Service providers — the companies running the data centres.\n- The Internet — the medium in between.\n\nTwo critical factors determine how efficient it is: the speed and reliability of the user's Internet connection, and the Internet's ability to provide safe and reliable transmission of the data.\n\nDeployment models: public, private, hybrid and community.\nService types: SaaS (software over the Internet, e.g. Google Applications), PaaS (a platform to deploy your own applications on, e.g. Amazon Web Services, Microsoft Azure) and IaaS (just the hardware and network, e.g. IBM, Amazon AWS).\n\nIllustration: instead of buying a server, installing a database on it and backing it up yourself, you rent the same capability from a provider, pay for what you use, and reach it through a browser from any device.",
    keyPoints: [
      "Shifts computing activities from the desktop to computers on the Internet",
      "Three components: clients, service providers, the Internet",
      "Two critical factors: speed/reliability of the connection, and safe reliable transmission",
      "Deployment models: public, private, hybrid, community",
      "Service types: SaaS, PaaS, IaaS"
    ],
    repeats: 4
  },

  {
    id: "fin-def-encryption",
    chapter: 4,
    source: "final",
    sourceLabel: "Final paper Q2(b)(iv) · Revision Q1(f)",
    papers: ["final-paper", "revision"],
    type: "open",
    marks: 3,
    question: "Define / illustrate the term Encryption.",
    modelAnswer: "Encryption is the coding of information to make it unreadable, except to those who are permitted to read it and who hold the key to decode the message.\n\nEncrypting changes plain text into encrypted text (ciphertext); decryption is the reverse operation, turning ciphertext back into readable form with the key.\n\nThe notes list five cases where it is used: email, files, websites, VPN connections, and wireless networks secured with WPA or WPA2.\n\nIllustration: the padlock on a banking website. Your card number leaves your browser as ciphertext, travels across networks that anyone could be watching, and is only turned back into a card number by the bank's server, which holds the key. Anyone intercepting it in between sees nothing usable.\n\nIf the marks allow, add the drawbacks: encryption slows the flow of data and consumes bandwidth, it enlarges files, key management adds complexity, and losing the key means losing the data.",
    keyPoints: [
      "Coding information so it is unreadable without the key",
      "Encrypt: plain text → ciphertext. Decrypt: the reverse",
      "Cases: email, files, websites, VPN, wireless (WPA/WPA2)",
      "Drawbacks: slower data flow, larger files, key management complexity"
    ],
    repeats: 2
  },

  {
    id: "fin-def-phishing",
    chapter: 4,
    source: "final",
    sourceLabel: "Final paper Q2(b)(iii) · Revision Q1(g)",
    papers: ["final-paper", "revision"],
    type: "open",
    marks: 3,
    question: "Define / illustrate the term Phishing.",
    modelAnswer: "Phishing is a technique employed by scammers who try to trick Internet users into believing that a fake but official-looking site is genuine, so that the user hands over personal information.\n\nIt is a type of social engineering — the practice of manipulating people into divulging private data — and it feeds directly into identity theft and Internet scams.\n\nIllustration: an email that appears to come from your bank, warning that your account will be suspended unless you confirm your details, with a link to a page that is a pixel-perfect copy of the bank's login screen. Everything typed into it goes to the attacker.\n\nRelated forms to name if more marks are on offer:\n\n- Vishing — the same attack carried out by voice call.\n- Smishing — carried out through fake text messages that appear to come from trusted sources.\n- Pretexting — inventing a fabricated scenario to manipulate the victim.\n- Baiting — the same idea but using the promise of a free gift.\n- Quid pro quo — offering a service rather than goods in exchange.",
    keyPoints: [
      "Tricking users with a fake but official-looking site or message",
      "A form of social engineering",
      "Leads to identity theft and Internet scams",
      "Variants: vishing (voice), smishing (SMS), pretexting, baiting, quid pro quo"
    ],
    repeats: 2
  },

  {
    id: "fin-def-privacy-threats",
    chapter: 4,
    source: "final",
    sourceLabel: "Final paper Q2(b)(v)",
    papers: ["final-paper"],
    type: "open",
    marks: 5,
    question: "Illustrate the concept of Privacy Threats.",
    modelAnswer: "Privacy threats are the ways in which information about an individual is collected, monitored or exposed without their knowledge or consent. The notes name five:\n\n- Computer monitoring software — programs such as SpyAgent, described as the most dangerous of these, because they track email, chats and everything else done on the machine.\n- Keystroke loggers — record activity and every key pressed, and can hijack the browser.\n- Spyware — records and reports Internet activity, and changes the browser to manipulate what the user sees.\n- Web bugs — invisible images or HTML code hidden inside an email message or a web page, which report back when it is opened.\n- Online identity — the information people post about themselves online, which can be gathered and used against them.\n\nThey belong to a wider picture of how personal data is gathered: large organisations, cookies, information resellers and brokers, private networks, the Internet and the web, online identity, and web bugs and spyware. Employers add another layer with employee monitoring software such as Flexiserver, InterGuard or Deputy, which watches application usage, Internet and social media activity and work output.\n\nThe critical information also sits on your own hard drive: history files with the addresses of sites visited, temporary Internet files saved from those sites, cookies, search engine history and browser records of your activity.\n\nWays to protect against them: use private browsing modes, install anti-spyware programs, use free web-based email for casual sign-ups, fill in information only when you must, never save account numbers or passwords, and turn off cookies.",
    keyPoints: [
      "Computer monitoring software — e.g. SpyAgent, tracks email and chat",
      "Keystroke loggers — record keystrokes and hijack the browser",
      "Spyware — records and reports Internet activity, manipulates the browser",
      "Web bugs — invisible images or HTML hidden in an email or page",
      "Online identity — what people post about themselves",
      "Protection: privacy mode, anti-spyware, minimal disclosure, no saved passwords, cookies off"
    ]
  },

  /* ================================================ THEORY QUESTIONS ===== */

  {
    id: "fin-username-domain",
    chapter: 3,
    source: "final",
    sourceLabel: "Final paper Q1(a) · Revision Q2 · Additional Q3",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 8,
    question: "Illustrate the difference between the user name and the domain name in an email address.",
    modelAnswer: "An email address uniquely identifies an individual or organisation connected to the Internet, and it has two parts separated by an @ sign.\n\nTake ahmed.ali@university.edu.my\n\n- User name — ahmed.ali — the part before the @. It identifies a particular person within an organisation. It is chosen and administered by that organisation, and it only has to be unique inside it.\n- Domain name — university.edu.my — the part after the @. It specifies the server to which the email is to be delivered. It is registered globally and must be unique across the whole Internet, and DNS resolves it to the IP address of that mail server.\n\nThe practical difference is which half does which job during delivery. The domain name gets the message to the right mail server anywhere in the world; the user name then decides which mailbox on that server it drops into.\n\nSo two people can both be ahmed.ali as long as they are at different domains, but no two organisations can hold the same domain name.\n\nThe last part of the domain is also a registration category: .com for a commercial organisation, .edu for an educational one, .gov for a branch of the US government.",
    keyPoints: [
      "An email address has two parts separated by @",
      "User name — identifies a person within an organisation, unique only inside it",
      "Domain name — specifies the server the mail is delivered to, unique globally",
      "Domain name routes to the server; user name selects the mailbox on it",
      "Domain suffix is a category: .com commercial, .edu educational, .gov government"
    ],
    repeats: 4
  },

  {
    id: "fin-cloud-adv-disadv",
    chapter: 6,
    source: "final",
    sourceLabel: "Final paper Q1(b) · Revision Q9",
    papers: ["final-paper", "revision"],
    type: "open",
    marks: 25,
    question: "Provide EIGHT (8) advantages and TWO (2) disadvantages of using cloud computing. (The final paper asked for SIX advantages only — the extra two are there so you can drop the weakest.)",
    modelAnswer: "Eight advantages\n\n1. Cost efficiency — you pay for what you use instead of buying, housing and maintaining your own servers, so there is no large capital outlay and no idle hardware.\n2. Almost unlimited storage — capacity can be added on demand rather than being fixed by the disks you happen to own.\n3. Backup and recovery — the provider replicates data across its infrastructure, so recovering from a failure is far easier than restoring from your own tapes or drives.\n4. Automated software updates — the provider patches and upgrades the software centrally, so the client is always on a current version without doing the work.\n5. 24/7 availability — the service is reachable at any hour, from any device with an Internet connection.\n6. Easy access to information — staff can reach the same data and applications from anywhere, which supports remote and distributed working.\n7. Quick deployment — a service can be provisioned in minutes, where buying and installing equivalent hardware would take weeks.\n8. Scalability and flexibility — resources can be increased or decreased easily as demand changes, so you are not paying for a peak you only hit twice a year.\n\nTwo disadvantages\n\n1. Security in the cloud, and the risk of attack — using cloud services means surrendering your organisation's sensitive information to a third-party provider, which increases the security risk. Storing information in the cloud also makes the client vulnerable to external attack, because the data sits somewhere permanently reachable over the Internet.\n2. Technical issues and downtime — the service depends entirely on your Internet connection and on the provider's own availability. If either fails you cannot reach your data at all, and you have no way of fixing the problem yourself.\n\nOther disadvantages you could substitute: inflexibility, in the sense that choosing a provider locks you into their applications and makes moving away difficult; and legislation and regulation, since data held in another country falls under that country's laws.\n\nNote on the marks: this is a 25-mark question on the paper, so name each point and then explain it in a sentence or two — a bare list will not carry the marks.",
    keyPoints: [
      "Cost efficiency; almost unlimited storage; backup and recovery",
      "Automated software updates; 24/7 availability; easy access to information",
      "Quick deployment; scalability and flexibility of resources",
      "Disadvantage: security — sensitive data handed to a third party, and exposed to attack",
      "Disadvantage: technical issues and downtime — total dependence on the connection",
      "Others: inflexibility / provider lock-in, legislation and regulation"
    ],
    repeats: 3
  },

  {
    id: "fin-rev-03",
    chapter: 4,
    source: "final",
    sourceLabel: "Revision Q3",
    papers: ["revision"],
    type: "open",
    marks: 6,
    question: "Privacy concerns the collection and use of data about individuals. Explain the THREE (3) primary privacy issues.",
    modelAnswer: "Privacy is an individual's ability to eliminate the collection, use and sale of confidential personal information. Within it there are three primary issues:\n\n1. Accuracy — the responsibility of those who collect data.\nWhoever gathers data is responsible for it being correct and for keeping it correct. Inaccurate data is not a harmless error: a wrong entry in a credit record or a medical record follows a person around and is acted on by everyone who reads it, and the individual often has no idea it exists.\n\n2. Property — who owns the data, and who has rights to the software usage.\nOnce information about you has been collected, who owns it? The person it describes, or the organisation that gathered it? This is the issue behind information resellers and brokers, who buy and sell personal data as an asset, and it extends to who has the right to use particular software.\n\n3. Access — the control of access to the data by authorised users.\nWho is allowed to see the data, and how is that controlled? This covers both keeping unauthorised people out and the individual's own right to see what has been recorded about them and have it corrected.\n\nDo not confuse these three with the three most significant concerns of computer security, which are privacy, security and ethics. That confusion is exactly what the multiple-choice version of this question is built to catch.",
    keyPoints: [
      "Accuracy — responsibility of those who collect the data",
      "Property — who owns the data and who has rights to software usage",
      "Access — control of access to the data by authorised users",
      "Privacy itself = the ability to eliminate collection, use and sale of personal information",
      "Not the same as privacy / security / ethics, the three security concerns"
    ],
    repeats: 2
  },

  {
    id: "fin-rev-04",
    chapter: 1,
    source: "final",
    sourceLabel: "Revision Q4",
    papers: ["revision"],
    type: "open",
    marks: 4,
    question: "State the difference between the Internet and the Web.",
    modelAnswer: "The Internet is the physical network that connects millions of computers together globally and allows them to communicate. It is infrastructure: cables, routers, satellites, and the TCP/IP protocols that let cooperating computers share resources across it.\n\nThe World Wide Web is a way of accessing information over the medium of the Internet — a collection of web pages, written in HTML, reached through a web browser and served over HTTP.\n\nSo the relationship is one-directional: the Web is one of the services running on top of the Internet, not the other way round.\n\nThe usual follow-up question makes the point clearly. Can you have the Internet without the Web? Yes — messaging apps such as WhatsApp, email, file transfer with FTP, video calls and online gaming all use the Internet without touching the Web. Can you have the Web without the Internet? No, because it would have nothing to travel over.\n\nAlso worth knowing: no one owns the Internet, and its standards for the Web are published by the World Wide Web Consortium (W3C).",
    keyPoints: [
      "Internet = the physical network infrastructure connecting computers globally",
      "Web = a way of accessing information over that network; a collection of web pages",
      "The Web is one service among many running on the Internet",
      "Internet without the Web: yes (email, WhatsApp, FTP, gaming). Web without the Internet: no"
    ],
    repeats: 2
  },

  {
    id: "fin-web-generations",
    chapter: 2,
    source: "final",
    sourceLabel: "Revision Q5 · Additional Q4",
    papers: ["revision", "additional"],
    type: "open",
    marks: 9,
    question: "Compare the content interaction and data connectivity of Web 1.0, Web 2.0 and Web 3.0.",
    modelAnswer: "Web 1.0 (1991–2001) — the read-only web\n\nContent interaction: static web pages with linear content and very limited user interaction. Communication is one-way — the site publishes and the visitor reads, with no way to contribute.\nData connectivity: pages are separate documents joined only by hypertext links. Nothing understands what the content means; it is simply files served to a browser.\n\nWeb 2.0 (post-2001) — the read-write web\n\nContent interaction: dynamic web pages, rich media content and interactive platforms such as social media. Users generate the content themselves, and improved bandwidth is what made that practical.\nData connectivity: data is shared between sites and applications, and content is created collaboratively — but the meaning of the data is still interpreted by people, not by machines.\n\nWeb 3.0 — the Semantic Web\n\nContent interaction: content is processed by machines as well as read by people. Advanced algorithms and new standards produce smarter search engines and intelligent applications that can act on the content.\nData connectivity: the web becomes a semantic, interconnected data space. Data is linked and machine-readable, so systems can combine information from different sources and reason about it rather than just display it.\n\nThe one-line summary that carries the marks: Web 1.0 you read, Web 2.0 you write, Web 3.0 the machine understands.",
    keyPoints: [
      "Web 1.0 (1991–2001): static pages, linear content, limited interaction, one-way communication",
      "Web 2.0 (post-2001): dynamic pages, rich media, social platforms, user-generated content, better bandwidth",
      "Web 3.0: the Semantic Web — interconnected, machine-readable data, smarter search engines",
      "Read → read-write → machine-understandable"
    ],
    repeats: 3
  },

  {
    id: "fin-rev-07",
    chapter: 6,
    source: "final",
    sourceLabel: "Revision Q7",
    papers: ["revision"],
    type: "open",
    marks: 6,
    question: "Data analytics involves analyzing raw data to help businesses make informed decisions. Explain any THREE (3) types of data analytics.",
    modelAnswer: "1. Descriptive analytics — what happened?\nIt looks at historical data to understand past performance. It summarises what has already occurred: last quarter's sales, how many visitors a site had, which pages they read. In web analytics this is the audience data and audience behaviour — number of visits, and which pages are visited most often.\n\n2. Predictive analytics — what is likely to happen?\nIt uses historical data, statistical models and machine learning to forecast future trends. Rather than only describing the past, it estimates what comes next: which customers are likely to leave, how much stock will be needed next month, which campaign will draw the most traffic.\n\n3. Prescriptive analytics — what should we do about it?\nIt goes a step further and uses algorithms and AI to suggest specific actions that take advantage of those predictions. It does not just say demand will rise; it recommends how much to order and when.\n\nThe three are a progression: describe the past, predict the future, then prescribe the action. If you are asked for a fourth, diagnostic analytics sits between the first two and asks why something happened — check whether your slides include it.",
    keyPoints: [
      "Descriptive — looks at historical data to understand past performance",
      "Predictive — uses historical data, statistical models and machine learning to forecast trends",
      "Prescriptive — uses algorithms and AI to suggest specific actions",
      "A progression: what happened → what will happen → what to do"
    ]
  },

  {
    id: "fin-rev-08",
    chapter: 6,
    source: "final",
    sourceLabel: "Revision Q8",
    papers: ["revision"],
    type: "open",
    marks: 6,
    question: "Briefly describe the THREE (3) types of cloud computing services.",
    modelAnswer: "1. SaaS — Software as a Service\nSaaS gives clients the ability to use software applications over the Internet by subscription. The client does not install or maintain anything; they simply use the finished application from anywhere via the web.\nExamples: Google Applications, Salesforce.\n\n2. PaaS — Platform as a Service\nPaaS provides a platform on which clients can deploy their own applications and host them, without having to worry about the infrastructure — no setting up storage, servers or networking.\nExamples: Amazon Web Services, Microsoft Azure, Google App Engine, Rackspace.\n\n3. IaaS — Infrastructure as a Service\nIaaS provides just the hardware and the network. The client installs and develops the software and applications themselves, and has the most control and the most responsibility of the three.\nExamples: Amazon AWS, IBM.\n\nThe way to keep them straight is to ask how much the provider hands you: IaaS gives you the machine, PaaS gives you the machine and the platform to build on, SaaS gives you the finished program.\n\nDo not confuse these with the deployment models, which are public, private, hybrid and community.",
    keyPoints: [
      "SaaS — use finished software over the Internet by subscription (Google Applications, Salesforce)",
      "PaaS — a platform to deploy and host your own applications (AWS, Azure, Google App Engine, Rackspace)",
      "IaaS — just hardware and network; you install the software (Amazon AWS, IBM)",
      "Service types are not the same as deployment models (public, private, hybrid, community)"
    ],
    repeats: 2
  },

  {
    id: "fin-protect-privacy",
    chapter: 4,
    source: "final",
    sourceLabel: "Revision Q10 · Additional Q1",
    papers: ["revision", "additional"],
    type: "open",
    marks: 6,
    question: "Briefly describe THREE (3) ways you can use to protect your privacy when you are online.",
    modelAnswer: "1. Use privacy modes and turn off cookies.\nBrowsing in a private window stops the browser keeping history files, temporary Internet files and cookies from the session. That matters because those are exactly where the critical information sits on your own hard drive: the addresses of sites you visited, saved files from them, and cookies recording your browsing habits and preferences. Turning off cookies, and especially third-party cookies generated by advertising companies working with the site you are on, cuts off the main way your behaviour is tracked across sites.\n\n2. Install anti-spyware programs and a security suite.\nSpyware records and reports your Internet activity and changes your browser to manipulate what you see; keystroke loggers record everything you type; web bugs are invisible images hidden in a page or an email that report back when opened. Anti-spyware software detects and removes these, and a full security suite provides a collection of programs designed to protect your privacy and security while you are online.\n\n3. Give away as little as possible.\nFill in information only where you actually need to, do not save account numbers or passwords in the browser, and use a free web-based email address for casual sign-ups rather than your real one. The less you hand over, the less there is for large organisations, information resellers and brokers to collect, and the smaller your online identity — the information people post about themselves — becomes.\n\nA fourth, if it is wanted: use a VPN on public Wi-Fi, so that a rogue hotspot imitating a legitimate one cannot read your traffic.",
    keyPoints: [
      "Use privacy/private browsing modes and turn off cookies",
      "Install anti-spyware programs and a security suite",
      "Fill in information only when necessary; never save account numbers or passwords",
      "Use a free web-based email address for casual sign-ups",
      "Use a VPN on public Wi-Fi"
    ],
    repeats: 3
  },

  {
    id: "fin-rev-12",
    chapter: 4,
    source: "final",
    sourceLabel: "Revision Q12",
    papers: ["revision"],
    type: "open",
    marks: 8,
    question: "Imagine that you are designing a project and writing the report. State FOUR (4) ways that you will use to protect your work.",
    modelAnswer: "1. Assert copyright and your digital rights.\nCopyright and digital rights give content creators the right to control the use and distribution of their work. Putting your name, the date and a copyright line on the report establishes authorship, and it is the legal basis for objecting if someone copies it.\n\n2. Cite every source properly, to protect the work against a plagiarism claim.\nPlagiarism is using another person's work or ideas without giving credit to the original author. Referencing everything you drew on protects your own integrity, and it makes clear which parts of the report are genuinely yours — which is what you would need if your authorship were ever questioned.\n\n3. Back up the data and the document regularly.\nBacking up your data and system is one of the principal measures for protecting computer security, and it is the only defence against the failures that actually destroy student work: a dead drive, a lost laptop, or ransomware encrypting the file and demanding payment. Keep at least one copy somewhere separate from the working machine.\n\n4. Restrict access and encrypt the files.\nRestrict access using authentication — a password on the account and on the document itself — so that only you can open or change it. Encrypt the file so that if the device is stolen the content is unreadable without the key. Both are listed among the principal measures for protecting computer security.\n\nA fifth if it is wanted: keep dated versions rather than overwriting one file, so an accidental deletion or a bad edit can be undone.",
    keyPoints: [
      "Copyright and digital rights — control use and distribution of your work",
      "Cite sources properly — plagiarism is using work or ideas without credit",
      "Back up the data and system regularly, to somewhere separate",
      "Restrict access with authentication, and encrypt the files",
      "Keep dated versions rather than overwriting"
    ]
  },

  {
    id: "fin-rev-13",
    chapter: 5,
    source: "final",
    sourceLabel: "Revision Q13",
    papers: ["revision"],
    type: "open",
    marks: 10,
    question: "Discuss the advantages and disadvantages of using search engines like Google for research purposes. Provide examples of alternative research tools or databases that can complement or replace search engine results.",
    modelAnswer: "Advantages\n\n- Speed and reach — an enormous index is searched in a fraction of a second, and material can be found that you would never have known to look for.\n- Free and available to everyone — no subscription, no library membership, reachable from any device.\n- Good starting point — a general search quickly gives you the vocabulary of a topic and the names of the people working in it, which is what you need before you can search properly anywhere else.\n\nDisadvantages\n\n- No quality control — anyone can publish a web page. Results are not peer reviewed, and there is nothing to stop an inaccurate page ranking above an accurate one.\n- Ranking is not the same as relevance or authority — results are ordered by algorithms and affected by advertising and popularity, not by academic merit.\n- Unstable sources — pages change or disappear, so what you cited may not be there when your marker looks.\n- No research skill is demonstrated — anyone can search Google or find Wikipedia. To develop academic skills you are expected to go beyond these basic tools.\n\nAlternatives that complement or replace them\n\n- Google Scholar — a simple way to search for scholarly articles from one place. It lets you explore related works, citations, authors and publications, locate the complete document through the web, keep up with recent developments in a field, and check who is citing your own publication.\n- arXiv — a free distribution service and open-access archive of roughly two million scholarly articles in physics, mathematics, computer science and related fields. Note that these are preprints and e-prints, so they have not necessarily been peer reviewed.\n- University library databases and journal collections — subscription databases that give access to peer-reviewed, published articles.\n- Wikipedia, used safely — not as a source, but scanned for general information and terminology and then for its references, which you then go and read.\n\nConclusion: use a search engine to orient yourself, then move to Google Scholar, arXiv or the library databases for anything you intend to cite, and cross-reference multiple sources to validate accuracy.",
    keyPoints: [
      "Advantages: speed, reach, free access, good for orientation and vocabulary",
      "Disadvantages: no peer review, ranking ≠ authority, unstable pages, shows no research skill",
      "Google Scholar — scholarly articles, citations, related works, who cites you",
      "arXiv — open-access archive of preprints and e-prints, ~2 million articles",
      "Library databases for peer-reviewed published work",
      "Wikipedia only for terms and its reference list"
    ]
  },

  {
    id: "fin-rev-14",
    chapter: 4,
    source: "final",
    sourceLabel: "Revision Q14",
    papers: ["revision"],
    type: "open",
    marks: 8,
    question: "Describe FOUR (4) methods individuals can use to protect their personal information online to prevent identity theft. Explain your answer.",
    modelAnswer: "Identity theft is the illegal assumption of a person's identity for bad gain, and social engineering is the usual way the information behind it is obtained. Four methods:\n\n1. Be alert to email scams and phishing.\nPhishing is a scammer sending official-looking messages to trick you into a fake site and into handing over personal information; smishing does it by text message and vishing by phone call. Never act on a link in an unexpected message, check the real sender rather than the display name, and use an anti-SPAM program to filter mail before it reaches you. Most identity theft starts with the victim volunteering the information.\n\n2. Give away as little as possible, and control your online identity.\nFill in information only where it is genuinely required, never save account numbers or passwords in a browser, and use a free web-based email address for casual sign-ups. Remember that your online identity — everything you post about yourself — is itself a source attackers mine, and that large organisations, information resellers and brokers collect and trade this data.\n\n3. Use encryption and a VPN, especially on untrusted networks.\nEncryption makes intercepted data unreadable without the key. On public Wi-Fi use a VPN, because rogue Wi-Fi hotspots imitate legitimate free networks specifically in order to capture the data passing through them. Make sure sites handling your details are encrypted, and stay away from dodgy sites — the notes single out badly designed sites beginning with plain http:// that may record your activity.\n\n4. Restrict access and install a security suite.\nUse authentication — strong, different passwords on each account — so that one leak does not open the rest. Install a security suite and anti-spyware, because computer monitoring software, keystroke loggers and spyware exist precisely to harvest what you type and where you go. Turn off cookies and use privacy browsing modes to reduce tracking, and back up your data so that a ransomware attack cannot force your hand.",
    keyPoints: [
      "Be alert to email scams — phishing, smishing, vishing; use anti-SPAM filtering",
      "Disclose as little as possible; never save account numbers or passwords",
      "Use encryption and a VPN; avoid rogue hotspots and dodgy sites",
      "Restrict access with strong authentication; install a security suite and anti-spyware",
      "Turn off cookies, use privacy modes, back up your data"
    ]
  },

  {
    id: "fin-credibility",
    chapter: 5,
    source: "final",
    sourceLabel: "Final paper Q4(a) · Revision Q15",
    papers: ["final-paper", "revision"],
    type: "open",
    marks: 25,
    question: "Provide key criteria for evaluating the credibility of online sources when conducting research on the internet and explain their significance. (The final paper asked for THREE; the revision sheet asks for at least FOUR.)",
    modelAnswer: "1. Authority — who wrote it, and what qualifies them?\nSignificance: expertise is what separates a reliable claim from an opinion. This is the first reason the notes give for not using Wikipedia — its content is not necessarily written by subject experts and may simply be incorrect. Look for a named author, their institution and their qualifications, and prefer a work published or hosted by a recognised body. The domain is a quick signal: .edu is an educational organisation, .gov a government branch, .com a commercial one with something to sell.\n\n2. Accuracy, verified by cross-referencing multiple sources.\nSignificance: cross-referencing is what validates accuracy. If a claim appears in only one place and nowhere else, treat it with suspicion. A credible source shows its own evidence — references, data, a described method — so that you can check the claim rather than take it on trust. This is also the safe way to use Wikipedia: take its terms and then read the references it cites.\n\n3. Objectivity — is there bias, and who benefits from you believing this?\nSignificance: a source funded by, or selling, the thing it is describing has a reason to present it selectively. Look at whether the piece argues a case or reports evidence, whether opposing views are acknowledged, and whether the site is advertising something. Bias does not automatically make a source useless, but it changes how much weight you give it.\n\n4. Currency — how recent is it, and is it stable?\nSignificance: in a field like internet technologies, material dates quickly, and a page written for Web 1.0 conditions may be actively misleading now. Check the publication or last-updated date. Stability matters too: this is the second reason the notes give against Wikipedia — articles may be changed or deleted between viewings, so what you cite today may not say the same thing tomorrow.\n\n5. Purpose and audience — why was it published?\nSignificance: a peer-reviewed article, a company's marketing page and a student blog post are written for different reasons and held to different standards. Knowing which you are reading tells you how much scrutiny it has already survived.\n\nApply the criteria by preferring peer-reviewed work: Google Scholar for scholarly articles, and university library databases for published, peer-reviewed material. Remember that arXiv holds preprints and e-prints, which have not necessarily been peer reviewed.\n\nNote on the marks: this is a 25-mark question on the paper. Name each criterion, explain what you actually check, and then say why it matters — the significance is where half the marks sit.",
    keyPoints: [
      "Authority — named author, qualifications, institution, domain type",
      "Accuracy — cross-reference multiple sources; the source shows its own evidence",
      "Objectivity — bias, funding, whether opposing views are acknowledged",
      "Currency — publication date, and whether the page is stable enough to cite",
      "Purpose — peer-reviewed article vs marketing page vs blog post",
      "Prefer Google Scholar and library databases; arXiv preprints are not peer reviewed"
    ],
    repeats: 2
  },

  {
    id: "fin-rev-16",
    chapter: 1,
    source: "final",
    sourceLabel: "Revision Q16",
    papers: ["revision"],
    type: "open",
    marks: 8,
    question: "Discuss the importance of Internet Technologies in our daily life. Provide FOUR (4) points and elaborate them to support your opinion.",
    modelAnswer: "1. Communication.\nThe Internet has replaced most of what postal mail and the telephone used to do. Email reaches anyone in seconds instead of days, costs nothing to send, and is far more environmentally friendly than posting a letter — no paper, no envelope, no vehicle. Messaging apps, video calls and social networking keep families and colleagues in contact across any distance, and much of that traffic does not touch the Web at all: it runs directly over the Internet.\n\n2. Education and e-learning.\nCourse material, recorded lectures, scholarly articles and reference works are available from anywhere at any time. Google Scholar puts peer-reviewed research one search away and arXiv gives open access to around two million papers. Students who could not attend a campus at all can now take a full course remotely.\n\n3. Commerce and banking.\nOnline shopping and digital banking let people buy, pay, transfer and manage money without going anywhere, at any hour. For businesses the same technologies remove the cost of a physical shopfront and open a global market to a small trader. Encryption — HTTPS on the website and WPA/WPA2 on the wireless link — is what makes it safe enough to do.\n\n4. Work and access to information.\nCloud computing means the software and the files no longer live on one desk: staff reach the same applications and data from anywhere, so remote and distributed working became practical. Searching means an answer that once took a day in a library takes a minute. Set against that, the same technologies bring real costs — privacy threats, cyber crime and identity theft — which is why the security material in this course sits alongside the rest.",
    keyPoints: [
      "Communication — email, messaging, video calls; faster, cheaper, greener than post",
      "Education and e-learning — course material, Google Scholar, arXiv, remote study",
      "Commerce and banking — online shopping, digital banking, global reach, secured by encryption",
      "Work and information — cloud computing enables remote working; searching replaces the library",
      "Balance the answer with the costs: privacy threats, cyber crime, identity theft"
    ],
    repeats: 2
  },

  {
    id: "fin-rev-17",
    chapter: 4,
    source: "final",
    sourceLabel: "Revision Q17",
    papers: ["revision"],
    type: "open",
    marks: 6,
    question: "Explain what a firewall is and list down TWO (2) benefits of using it.",
    modelAnswer: "What a firewall is\n\nA firewall is a program — usually running on an Internet gateway server — that protects the resources of one network from users on other networks. It sits between a private network and every external network and acts as a security buffer, deciding which traffic is allowed through in each direction. It can exist as dedicated hardware, as software on a machine, or as a managed service, and it is one of the principal measures for protecting computer security.\n\nIt filters on a number of things: individual packets, IP addresses, domain names, protocols, port numbers and keywords, and it can act as a proxy or inspect each packet as it passes.\n\nTwo benefits\n\n1. It prevents outsiders from reaching your private data resources.\nThis is the whole purpose: unauthorised users on other networks are stopped at the boundary, so intrusion — hackers gaining access without permission — is much harder. Blocking by IP address keeps specific hostile machines out entirely.\n\n2. It gives control over what enters and leaves the network.\nAn administrator can permit only the services that are actually needed on each system, restrict a service to specified ports, block access to particular websites, and sift the data flowing through the network for keywords. That limits both what can come in and what a compromised machine inside the network can send out.",
    keyPoints: [
      "A program, usually on an Internet gateway server, protecting one network from users of others",
      "A security buffer between private and external networks",
      "Can be hardware, software on a machine, or a managed service",
      "Benefit 1: keeps outsiders away from private data resources — blocks intrusion",
      "Benefit 2: control over which services, ports, sites and keywords are allowed"
    ]
  },

  {
    id: "fin-html-css-js-purpose",
    chapter: 8,
    source: "final",
    sourceLabel: "Final paper Q3(b) · Revision Q18",
    papers: ["final-paper", "revision"],
    type: "open",
    marks: 25,
    question: "Explain what HTML, CSS and JavaScript stand for, and explain their primary purpose in web development.",
    modelAnswer: "HTML — HyperText Markup Language\n\nHTML is a tagging language used to compose documents that will be viewed by a web browser. It was adopted so that whatever computer platform someone is using, their browser knows how to display the document.\n\nIts primary purpose is structure and content: it says what things ARE. A heading is marked with h1, a paragraph with p, a list with ul or ol, a link with a, an image with img and a table with table. The browser builds the page out of those tags. HTML alone produces a page that is plain but complete and readable.\n\nCSS — Cascading Style Sheets\n\nIts primary purpose is presentation: it says what things LOOK LIKE — colour, background, font, size, spacing, borders, and the layout of the page.\n\nCSS can be applied three ways: inline with a style attribute on one element, internally with a style block inside the head of the document, or externally with a separate .css file linked into every page. The external form is preferred for a real site, because one file then controls the appearance of the whole thing.\n\nJavaScript\n\nIts primary purpose is behaviour: it makes the page DO things. It runs in the browser and can respond to events such as a button click, read what the user typed, perform calculations, and change the page while it is being viewed — for example by writing into an element with document.getElementById(\"output\").innerHTML.\n\nHow they fit together\n\nThe standard analogy is a house: HTML is the structure, CSS is the paint and furnishing, JavaScript is the electricity and the moving parts. They are separate on purpose — content, appearance and behaviour can each be changed without disturbing the other two.\n\nNote on the marks: this is worth 25 marks on the paper. Expand each of the three with a small code example — a heading in HTML, a colour rule in CSS, a button that changes text in JavaScript — because the examples are what fill out an answer of that size.",
    keyPoints: [
      "HTML = HyperText Markup Language — structure and content, a tagging language",
      "HTML is platform-independent, so any browser knows how to display it",
      "CSS = Cascading Style Sheets — presentation: colour, font, spacing, layout",
      "CSS three ways: inline, internal (style block in head), external (.css file)",
      "JavaScript — behaviour: responds to events and changes the page while it is viewed",
      "Structure / appearance / behaviour, deliberately kept separate"
    ],
    repeats: 2
  },

  /* ============================================ CODE-WRITING QUESTIONS === */

  {
    id: "fin-code-ul",
    chapter: 8,
    source: "final",
    sourceLabel: "Revision Q11(a) · Additional Q5(a)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for an unordered HTML list.",
    modelAnswer: "An unordered list is a ul element containing li list items. The browser puts a bullet in front of each one, and the order carries no meaning.\n\n```\n<h3>Technologies used on the web</h3>\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>\n```\n\nOutput: three bulleted lines reading HTML, CSS, JavaScript.\n\nPoints the marker looks for: the ul opens and closes, every item is wrapped in its own li, and the li elements sit inside the ul rather than beside it. Text placed directly in a ul without an li is invalid.",
    keyPoints: [
      "ul = unordered list, li = each list item",
      "Bulleted; the order carries no meaning",
      "Every item must be wrapped in its own li",
      "Contrast with ol, which numbers the items"
    ],
    repeats: 2
  },

  {
    id: "fin-code-ol",
    chapter: 8,
    source: "final",
    sourceLabel: "Final paper Q2(a)(v) · Revision Q11(b) · Additional Q5(b)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for an ordered HTML list, using the <ol> tag.",
    modelAnswer: "An ordered list is an ol element containing li list items. The browser numbers them, so it is used when the sequence matters.\n\n```\n<h3>How to visit a web page</h3>\n<ol>\n  <li>Open the web browser</li>\n  <li>Type the address in the address bar</li>\n  <li>Press Enter and wait for the page to load</li>\n</ol>\n```\n\nOutput: three numbered lines, 1, 2, 3.\n\nUseful attributes if you want the marks for detail: type changes the marker (type=\"A\" gives A, B, C; type=\"i\" gives i, ii, iii) and start begins the numbering somewhere other than 1.\n\n```\n<ol type=\"A\" start=\"3\">\n  <li>This item is labelled C</li>\n  <li>This item is labelled D</li>\n</ol>\n```\n\nThe difference from ul in one line: ol numbers, ul bullets. The tag inside is li for both.",
    keyPoints: [
      "ol = ordered list, numbered because the sequence matters",
      "li wraps every item, exactly as in a ul",
      "type=\"A\" or type=\"i\" changes the marker; start changes the first number",
      "ol numbers, ul bullets"
    ],
    repeats: 3
  },

  {
    id: "fin-code-listbox",
    chapter: 8,
    source: "final",
    sourceLabel: "Revision Q11(c) · Additional Q5(c)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for an HTML list box.",
    modelAnswer: "A list box is a select element with a size attribute greater than 1, so that several options are visible at once instead of being hidden behind a drop-down.\n\n```\n<label for=\"course\">Choose a course:</label>\n<select id=\"course\" name=\"course\" size=\"3\">\n  <option value=\"bic1234\">Introduction to Internet Technologies</option>\n  <option value=\"bic2001\">Database Systems</option>\n  <option value=\"bic2002\">Computer Networks</option>\n</select>\n```\n\nOutput: a box showing three visible rows, one of which can be selected.\n\nThe variations worth knowing:\n\n- Leave size out and you get a drop-down instead: <select id=\"course\" name=\"course\">\n- Add multiple to let the user select more than one: <select id=\"course\" name=\"course\" size=\"3\" multiple>\n- Add selected to an option to make it the default: <option value=\"bic1234\" selected>...\n\nTwo things markers look for. The label's for attribute must match the select's id, and the two attributes on the select do different jobs: id is for reference inside the page (by the label and by JavaScript), while name is what identifies the field when the form is submitted.",
    keyPoints: [
      "A list box is a select with size greater than 1",
      "Each choice is an option element with a value",
      "size omitted = drop-down; multiple = more than one selectable; selected = the default",
      "label for must match the select's id",
      "id is for in-page reference, name is for form submission"
    ],
    repeats: 2
  },

  {
    id: "fin-code-border",
    chapter: 9,
    source: "final",
    sourceLabel: "Revision Q11(d)",
    papers: ["revision"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for a CSS border style.",
    modelAnswer: "The border shorthand takes three values in order: width, style and colour. Leave the style out and nothing is drawn at all, because the default border-style is none.\n\n```\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>CSS Border Example</title>\n  <style>\n    p.boxed {\n      border: 2px solid #0000ff;\n      padding: 8px;\n    }\n    h2.underlined {\n      border-bottom: 3px dashed #ff0000;\n    }\n  </style>\n</head>\n<body>\n  <h2 class=\"underlined\">Chapter 9 - CSS</h2>\n  <p class=\"boxed\">This paragraph has a 2 pixel solid blue border around it.</p>\n</body>\n</html>\n```\n\nOutput: a heading with a red dashed line under it, and a paragraph inside a blue rectangle.\n\nThe style values available are solid, dashed, dotted, double, groove, ridge, inset, outset, none and hidden. The long form of the same rule is:\n\n```\np.boxed {\n  border-width: 2px;\n  border-style: solid;\n  border-color: #0000ff;\n}\n```\n\nAnd individual sides can be set on their own with border-top, border-right, border-bottom and border-left.",
    keyPoints: [
      "border shorthand = width, style, colour — all three parts",
      "Omitting the style means nothing is drawn; the default is none",
      "Styles: solid, dashed, dotted, double, groove, ridge, inset, outset",
      "Long form: border-width, border-style, border-color",
      "Single sides: border-top, border-right, border-bottom, border-left"
    ]
  },

  {
    id: "fin-code-for",
    chapter: 10,
    source: "final",
    sourceLabel: "Revision Q11(e)",
    papers: ["revision"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for a JavaScript for loop.",
    modelAnswer: "A for loop has three parts in its header: the initialisation, the condition it keeps looping while true, and the step performed after each pass.\n\n```\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>JavaScript For Loop</title>\n</head>\n<body>\n  <h2>Numbers 1 to 5</h2>\n  <p id=\"output\"></p>\n\n  <script>\n    var text = \"\";\n    for (var i = 1; i <= 5; i++) {\n      text += \"Number \" + i + \"<br>\";\n    }\n    document.getElementById(\"output\").innerHTML = text;\n  </script>\n</body>\n</html>\n```\n\nOutput on the page:\n\nNumber 1\nNumber 2\nNumber 3\nNumber 4\nNumber 5\n\nThe two mistakes that cost marks:\n\n1. To run five times starting at 1, the condition must be i <= 5. Writing i < 5 runs only four times, printing 1 to 4.\n2. Write the result into the page with innerHTML or document.write. Every JavaScript question in this course asks what appears on the page, and console.log puts nothing there — it only writes to the developer console, which the marker is not looking at.",
    keyPoints: [
      "for (initialisation; condition; step) { ... }",
      "Starting at 1 and running five times needs i <= 5, not i < 5",
      "Build the output in a variable, then write it into the page",
      "Use innerHTML or document.write for visible output — never console.log"
    ]
  },

  {
    id: "fin-code-ifelse",
    chapter: 10,
    source: "final",
    sourceLabel: "Revision Q11(f)",
    papers: ["revision"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for a JavaScript if-else statement.",
    modelAnswer: "An if-else runs one block when the condition is true and the other when it is false.\n\n```\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>JavaScript If Else</title>\n</head>\n<body>\n  <h2>Exam result</h2>\n  <p id=\"result\"></p>\n\n  <script>\n    var mark = 75;\n\n    if (mark >= 50) {\n      document.getElementById(\"result\").innerHTML = \"Mark \" + mark + \": Pass\";\n    } else {\n      document.getElementById(\"result\").innerHTML = \"Mark \" + mark + \": Fail\";\n    }\n  </script>\n</body>\n</html>\n```\n\nOutput on the page: Mark 75: Pass\n\nFor more than two outcomes, chain the tests with else if:\n\n```\nif (mark >= 80) {\n  grade = \"A\";\n} else if (mark >= 65) {\n  grade = \"B\";\n} else if (mark >= 50) {\n  grade = \"C\";\n} else {\n  grade = \"F\";\n}\ndocument.getElementById(\"result\").innerHTML = \"Grade: \" + grade;\n```\n\nThe mistake to avoid: = assigns a value, == or === compares. Writing if (mark = 50) sets mark to 50 and is always true.",
    keyPoints: [
      "if (condition) { ... } else { ... }",
      "Chain further tests with else if; the final else is the catch-all",
      "= assigns, == and === compare",
      "Write the result into the page with innerHTML, not console.log"
    ]
  },

  {
    id: "fin-code-a",
    chapter: 8,
    source: "final",
    sourceLabel: "Final paper Q2(a)(ii) · Revision Q11(g) · Additional Q7(b)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for an HTML link, using the <a> tag.",
    modelAnswer: "The a element makes a hyperlink. The href attribute holds the destination and the text between the tags is what the user clicks.\n\n```\n<!-- A link to another website: the protocol is required -->\n<a href=\"https://www.w3schools.com\">Visit W3Schools</a>\n\n<!-- A link to another page in the same site: a relative path -->\n<a href=\"notes.html\">Go to my notes page</a>\n\n<!-- Opening in a new tab -->\n<a href=\"https://www.google.com\" target=\"_blank\">Open Google in a new tab</a>\n\n<!-- An email link -->\n<a href=\"mailto:student@university.edu.my\">Email me</a>\n```\n\nThe mistake that costs the mark: writing href=\"www.w3schools.com\" without https://. The browser then treats it as a file name relative to the current folder and looks for a file called www.w3schools.com next to your page, which does not exist. An external link must carry its protocol.\n\nUse a relative path such as notes.html or pages/notes.html for your own pages, and never start it with a leading slash unless the site really is served from the root of its domain.",
    keyPoints: [
      "a href=\"...\" creates the link; the text between the tags is clickable",
      "External links need the full protocol: https://",
      "Internal links use a relative path, e.g. notes.html",
      "target=\"_blank\" opens in a new tab; mailto: opens an email"
    ],
    repeats: 3
  },

  {
    id: "fin-code-img",
    chapter: 8,
    source: "final",
    sourceLabel: "Final paper Q2(a)(i) · Revision Q11(h) · Additional Q7(c)",
    papers: ["final-paper", "revision", "additional"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for an HTML image, using the <img> tag.",
    modelAnswer: "The img element inserts an image. It is an empty element — there is no closing tag — and it needs two attributes: src for the file and alt for the text shown if the image cannot be displayed.\n\n```\n<img src=\"images/logo.png\" alt=\"University logo\" width=\"200\" height=\"100\">\n```\n\nWith a caption:\n\n```\n<figure>\n  <img src=\"images/campus.jpg\" alt=\"The main campus building\" width=\"400\">\n  <figcaption>The main campus building</figcaption>\n</figure>\n```\n\nThree things that lose marks here:\n\n1. Unclosed quotes. Every attribute value needs an opening AND a closing quote — src=\"images/logo.png\", not src=\"images/logo.png (which swallows the rest of the tag).\n2. A leading slash on the path. Write src=\"images/logo.png\", not src=\"/images/logo.png\". The relative form looks for an images folder next to the page, which is what you want; the leading slash looks in the root of the whole domain and usually breaks.\n3. A missing alt. alt is what a screen reader announces and what appears if the file is missing, and it is required for valid HTML.\n\nwidth and height are optional but worth adding: they let the browser reserve the right space before the image has downloaded.",
    keyPoints: [
      "img is an empty element with no closing tag",
      "src = the file, alt = the text shown if it cannot be displayed",
      "Both quotes must be closed on every attribute",
      "Use a relative path — no leading slash",
      "width and height are optional but reserve the layout space"
    ],
    repeats: 3
  },

  {
    id: "fin-code-table",
    chapter: 8,
    source: "final",
    sourceLabel: "Revision Q11(i) · Additional Q7(a)",
    papers: ["revision", "additional"],
    type: "open",
    marks: 4,
    question: "Provide ONE (1) code example for an HTML table.",
    modelAnswer: "A table is built from three nested elements: table wraps the whole thing, tr is one row, and inside a row th is a header cell and td is a data cell.\n\n```\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>Course Table</title>\n  <style>\n    table { border-collapse: collapse; }\n    th, td { border: 1px solid #000000; padding: 5px; text-align: left; }\n    th { background-color: #dddddd; }\n  </style>\n</head>\n<body>\n  <h2>My courses</h2>\n  <table>\n    <tr>\n      <th>Course Code</th>\n      <th>Course Name</th>\n      <th>Venue</th>\n    </tr>\n    <tr>\n      <td>BIC1234</td>\n      <td>Introduction to Internet Technologies</td>\n      <td>GG08</td>\n    </tr>\n    <tr>\n      <td>BIC2002</td>\n      <td>Computer Networks</td>\n      <td>GG12</td>\n    </tr>\n  </table>\n</body>\n</html>\n```\n\nOutput: a three-column grid with a shaded header row and two data rows.\n\nThe mistake to avoid: rows must be inside an actual table element. Writing tr and td on their own, or leaving the table tag unclosed, means the browser will not render a table at all.\n\nTwo extras worth knowing, because the merged-cell question uses them: rowspan makes a cell stretch down over several rows, and colspan makes it stretch across several columns.\n\n```\n<tr>\n  <td rowspan=\"2\">Spans two rows</td>\n  <td colspan=\"3\">Spans three columns</td>\n</tr>\n```",
    keyPoints: [
      "table wraps everything; tr is a row; th a header cell; td a data cell",
      "Rows must be inside a real table element",
      "border-collapse: collapse joins the cell borders into single lines",
      "rowspan stretches a cell down rows, colspan stretches it across columns"
    ],
    repeats: 2
  },

  {
    id: "fin-code-style",
    chapter: 9,
    source: "final",
    sourceLabel: "Final paper Q2(a)(iii)",
    papers: ["final-paper"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for using the <style> tag.",
    modelAnswer: "The style element holds internal CSS. It goes inside the head of the document and its rules apply to the whole of that one page.\n\n```\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>Internal CSS Example</title>\n  <style>\n    body {\n      background-color: #f4f4f4;\n      font-family: Arial, sans-serif;\n    }\n    h1 {\n      color: #0000ff;\n      text-align: center;\n    }\n    p.note {\n      border: 1px solid #999999;\n      padding: 10px;\n    }\n  </style>\n</head>\n<body>\n  <h1>Internal CSS Example</h1>\n  <p class=\"note\">This paragraph is styled by the rules in the style block above.</p>\n</body>\n</html>\n```\n\nOutput: a grey page with a centred blue heading and a bordered paragraph.\n\nThis is one of the three ways to apply CSS, and the distinction is often examined:\n\n- Inline — a style attribute on a single element: <p style=\"color: red;\">…</p>. Affects that one element only.\n- Internal — a style block in the head, as above. Affects that one page.\n- External — a separate .css file linked in with <link rel=\"stylesheet\" href=\"style.css\">. Affects every page that links it, which is why real sites use it.\n\nIf a question says internal CSS only, the rules must be in a style block in the head — not in style attributes on the elements, and not in a separate file.",
    keyPoints: [
      "style goes inside head and holds internal CSS for that page",
      "Inline = style attribute on one element",
      "Internal = style block in the head",
      "External = separate .css file linked with a link element",
      "\"Internal CSS only\" rules out both inline styles and an external file"
    ]
  },

  {
    id: "fin-code-h1",
    chapter: 8,
    source: "final",
    sourceLabel: "Final paper Q2(a)(iv)",
    papers: ["final-paper"],
    type: "open",
    marks: 3,
    question: "Provide ONE (1) code example for using the <h1> tag.",
    modelAnswer: "Headings run from h1 down to h6. h1 is the most important and there should normally be only one on a page — the main title of that page.\n\n```\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>Heading Example</title>\n</head>\n<body>\n  <h1>Introduction to Internet Technologies</h1>\n  <h2>Chapter 8 - HTML</h2>\n  <h3>Headings and paragraphs</h3>\n  <p>HTML provides six levels of heading, from h1 down to h6.</p>\n</body>\n</html>\n```\n\nOutput: the h1 line largest and boldest, h2 smaller, h3 smaller again, then the paragraph in normal body text.\n\nTwo points a marker looks for:\n\n1. Headings mark structure, not size. Use h1 because the text IS the main heading, then style it with CSS if you want it a particular size. Choosing h3 just because you wanted smaller text is the wrong reason.\n2. Do not skip levels going down — h1 then h2 then h3, not h1 then h4.\n\nAnd h1 is not the same thing as the title element: title sets the text in the browser tab and lives in the head, while h1 is the visible heading on the page itself.",
    keyPoints: [
      "Headings are h1 to h6; h1 is the most important",
      "Normally one h1 per page — the main title",
      "Headings indicate structure, not font size; use CSS for size",
      "Do not skip heading levels",
      "h1 is the visible heading; title is the browser-tab text in the head"
    ]
  },

  {
    id: "fin-rev-19-table",
    chapter: 8,
    source: "final",
    sourceLabel: "Revision Q19",
    papers: ["revision"],
    type: "open",
    marks: 15,
    question: "Based on the requirements and the figure given (“Table for Final Exam”), write the HTML and CSS code to generate the given output. Padding for each cell is 5px. Cell colours — Cell 0: yellow, Cell 2: #7acbfa, Cell 3: #fc6bcb, Cell 4: pink, Cell 5: #19f61c, Cell 6: #f68419.",
    modelAnswer: "This is a rowspan and colspan question. Work out the grid before writing a tag: the table is 5 columns wide and 6 rows deep. Cell 0 occupies the whole of the first column, so it is one cell with rowspan=\"6\", and every other row then only fills the remaining 4 columns.\n\nRow by row, after Cell 0:\nRow 1 — Cell 1, Cell 2, Cell 6 (rowspan 2), Cell 1 = 4 columns\nRow 2 — Cell 1, Cell 2, Cell 1 = 3 cells, because Cell 6 is still occupying the third column\nRow 3 — Cell 5 spanning all 4\nRow 4 — Cell 2 spanning 2, Cell 3 spanning 2\nRow 5 — Cell 5 spanning all 4\nRow 6 — Cell 4 spanning 3, Cell 1 in the last column\n\n```\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>Table for Final Exam</title>\n  <style>\n    table {\n      border-collapse: collapse;\n      width: 600px;\n    }\n    td {\n      border: 1px solid #000000;\n      padding: 5px;\n      text-align: center;\n    }\n    .c0 { background-color: yellow; }\n    .c2 { background-color: #7acbfa; }\n    .c3 { background-color: #fc6bcb; }\n    .c4 { background-color: pink; }\n    .c5 { background-color: #19f61c; }\n    .c6 { background-color: #f68419; }\n  </style>\n</head>\n<body>\n  <h2>Table for Final Exam</h2>\n\n  <table>\n    <tr>\n      <td class=\"c0\" rowspan=\"6\">Cell 0</td>\n      <td>Cell 1</td>\n      <td class=\"c2\">Cell 2</td>\n      <td class=\"c6\" rowspan=\"2\">Cell 6</td>\n      <td>Cell 1</td>\n    </tr>\n    <tr>\n      <td>Cell 1</td>\n      <td class=\"c2\">Cell 2</td>\n      <td>Cell 1</td>\n    </tr>\n    <tr>\n      <td class=\"c5\" colspan=\"4\">Cell 5</td>\n    </tr>\n    <tr>\n      <td class=\"c2\" colspan=\"2\">Cell 2</td>\n      <td class=\"c3\" colspan=\"2\">Cell 3</td>\n    </tr>\n    <tr>\n      <td class=\"c5\" colspan=\"4\">Cell 5</td>\n    </tr>\n    <tr>\n      <td class=\"c4\" colspan=\"3\">Cell 4</td>\n      <td>Cell 1</td>\n    </tr>\n  </table>\n</body>\n</html>\n```\n\nThe rule that keeps this from going wrong: every row must account for exactly 5 columns, counting cells that are spanning down into it from a row above. Row 2 has only three td elements because Cell 0 and Cell 6 are both still occupying columns in it. Add a fourth and the table will visibly shear to the right.\n\nCheck this against the original figure before you rely on it. The layout above was reconstructed from a photograph of the figure and the row-by-row description may not match the paper exactly — the technique is the point, so if the figure differs, redraw the grid on paper first, count the columns in each row, and then write the rowspan and colspan values to match.",
    keyPoints: [
      "Draw the grid and count columns per row before writing any HTML",
      "rowspan makes a cell occupy several rows; colspan several columns",
      "A row spanned into from above has fewer td elements, not more",
      "border-collapse: collapse, and padding: 5px on td as the requirements ask",
      "Named colours (yellow, pink) and hex colours both work in background-color",
      "Verify the layout against the original figure — this was rebuilt from a photo"
    ]
  },

  {
    id: "fin-rev-20-form",
    chapter: 8,
    source: "final",
    sourceLabel: "Revision Q20",
    papers: ["revision"],
    type: "open",
    marks: 12,
    question: "Use HTML code to generate a form containing: a “Name:” label with a single-line text input; a “Gender:” label with two radio buttons, Female and Male; a “Student Type:” label with a dropdown defaulting to “Undergraduate”; and a “Submit” button — the whole form enclosed in a visible black border.",
    modelAnswer: "```\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>Student Registration Form</title>\n  <style>\n    form {\n      border: 2px solid #000000;\n      padding: 15px;\n      width: 380px;\n      font-family: Arial, sans-serif;\n    }\n    p { margin: 12px 0; }\n    .caption { display: inline-block; width: 110px; }\n  </style>\n</head>\n<body>\n\n  <form action=\"register.php\" method=\"post\">\n\n    <p>\n      <label class=\"caption\" for=\"name\">Name:</label>\n      <input type=\"text\" id=\"name\" name=\"name\" size=\"25\">\n    </p>\n\n    <p>\n      <span class=\"caption\">Gender:</span>\n      <input type=\"radio\" id=\"female\" name=\"gender\" value=\"female\">\n      <label for=\"female\">Female</label>\n      <input type=\"radio\" id=\"male\" name=\"gender\" value=\"male\">\n      <label for=\"male\">Male</label>\n    </p>\n\n    <p>\n      <label class=\"caption\" for=\"studenttype\">Student Type:</label>\n      <select id=\"studenttype\" name=\"studenttype\">\n        <option value=\"undergraduate\" selected>Undergraduate</option>\n        <option value=\"postgraduate\">Postgraduate</option>\n      </select>\n    </p>\n\n    <p>\n      <input type=\"submit\" value=\"Submit\">\n    </p>\n\n  </form>\n\n</body>\n</html>\n```\n\nWhy each part is written that way:\n\n- The visible black border comes from border: 2px solid #000000 on the form itself. The shorthand needs all three parts — width, style and colour. Leave the style out and nothing is drawn.\n- The two radio buttons share name=\"gender\" but have different id values. Sharing the name is what makes them mutually exclusive, so that selecting Male clears Female. Give them different names and both could be selected at once, which is the classic mistake here.\n- Every label's for matches the id of its input, so clicking the word Female selects the button next to it. The word \"Gender:\" is a caption for the pair rather than for one input, so it is a span, not a label pointing at nothing.\n- name and id are not interchangeable. name is what identifies the field when the form is submitted; id is what the label and any JavaScript use to reference the element inside the page.\n- selected on the first option makes Undergraduate the default, as the question requires.\n- type=\"submit\" makes the button submit the form; its value attribute is the text shown on it.",
    keyPoints: [
      "border: 2px solid #000000 on the form gives the visible black border",
      "Radio buttons share one name so only one can be chosen; ids differ",
      "label for must match the input's id",
      "name is for form submission, id is for in-page reference",
      "selected on an option sets the default",
      "input type=\"submit\" with value=\"Submit\" makes the button"
    ]
  },

  {
    id: "fin-q4b-timetable",
    chapter: 9,
    source: "final",
    sourceLabel: "Final paper Q4(b)",
    papers: ["final-paper"],
    type: "open",
    marks: 25,
    question: "Using HTML and only internal CSS, design a web page that shows your timetable for the current semester, in the format of Figure 1. List at least FOUR (4) courses registered this semester. Header row #0000ff, odd rows #ADD8E6. Columns: Course Code, Course Name, Venue, Time.",
    modelAnswer: "Read the constraint first: internal CSS only. That means one style block inside the head. Not style attributes on the elements, and not a separate .css file linked in — either of those loses the marks even if the page looks right.\n\n```\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>My Timetable - Current Semester</title>\n\n  <style>\n    body {\n      font-family: Arial, sans-serif;\n      margin: 20px;\n    }\n\n    h1 {\n      font-size: 22px;\n      text-align: center;\n    }\n\n    table {\n      border-collapse: collapse;\n      width: 100%;\n    }\n\n    th, td {\n      border: 1px solid #000000;\n      padding: 8px;\n      text-align: left;\n    }\n\n    thead th {\n      background-color: #0000FF;\n      color: #FFFFFF;\n    }\n\n    tbody tr:nth-child(odd) {\n      background-color: #ADD8E6;\n    }\n  </style>\n</head>\n\n<body>\n\n  <h1>Timetable - Semester 1</h1>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Course Code</th>\n        <th>Course Name</th>\n        <th>Venue</th>\n        <th>Time</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr>\n        <td>BIC1234</td>\n        <td>Introduction to Internet Technologies</td>\n        <td>GG08</td>\n        <td>6:00 - 8:00 pm</td>\n      </tr>\n      <tr>\n        <td>BIC2002</td>\n        <td>Computer Networks</td>\n        <td>GG12</td>\n        <td>8:00 - 10:00 am</td>\n      </tr>\n      <tr>\n        <td>BIC2001</td>\n        <td>Database Systems</td>\n        <td>LT04</td>\n        <td>10:00 - 12:00 pm</td>\n      </tr>\n      <tr>\n        <td>BIC1002</td>\n        <td>Programming Fundamentals</td>\n        <td>Lab 3</td>\n        <td>2:00 - 4:00 pm</td>\n      </tr>\n    </tbody>\n  </table>\n\n</body>\n</html>\n```\n\nWhat each part is doing:\n\n- thead th { background-color: #0000FF; color: #FFFFFF; } gives the header row the blue the question asks for. White text is added because black on #0000FF is close to unreadable — say so in the answer and it reads as a deliberate choice.\n- tbody tr:nth-child(odd) { background-color: #ADD8E6; } shades the 1st and 3rd data rows light blue, leaving the 2nd and 4th white, which is the striped effect in Figure 1. Counting restarts inside tbody, so the header row is not counted.\n- border-collapse: collapse merges the cell borders into single lines instead of doubling them up.\n- th is used for the header cells and td for the data cells — using td throughout would still look right but loses the structural mark.\n\nIf your lecturer wants the striping without nth-child, the alternative is to put class=\"odd\" on the first and third rows and write .odd { background-color: #ADD8E6; }. Both are internal CSS and both satisfy the question.\n\nSwap in your own four courses, venues and times before you sit the exam so the content is genuinely yours.",
    keyPoints: [
      "Internal CSS only = one style block in the head; no inline styles, no external file",
      "thead th background-color #0000FF for the header row",
      "tbody tr:nth-child(odd) background-color #ADD8E6 for the striped rows",
      "border-collapse: collapse to merge the cell borders",
      "th for header cells, td for data cells",
      "At least four courses, with Course Code / Course Name / Venue / Time"
    ]
  },

  /* =========================================== CODE TRACING QUESTIONS ==== */

  {
    id: "fin-q3a-trace",
    chapter: 10,
    source: "final",
    sourceLabel: "Final paper Q3(a)",
    papers: ["final-paper"],
    type: "open",
    marks: 25,
    question: "Referring to the following HTML and JavaScript code: (i) show the output web page before and after clicking the button, and (ii) trace and explain the output.",
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>Try This</title>
  </head>

  <body>
    <h2>Try to figure out what this code does</h2>

    <button onclick="process()">Run Code</button>

    <p id="output"></p>
    <p>Carefully observe how the value changes. Can you recognize the pattern?</p>

    <script>
      function process() {
        let x = 1;
        let limit = 5;

        for (let i = 1; i <= limit; i++) {
          x = x * i;
        }
        document.getElementById("output").innerHTML = "Result is: " + x;
      }
    </script>
  </body>
</html>`,
    modelAnswer: "(i) The output web page\n\nBEFORE clicking the button — the browser tab reads \"Try This\" and the page shows:\n\nTry to figure out what this code does          (an h2 heading)\n[ Run Code ]                                   (a button)\n                                               (the paragraph with id=\"output\" is EMPTY, so nothing is shown here)\nCarefully observe how the value changes. Can you recognize the pattern?\n\nThe function is only defined, never called. Nothing runs until the button is clicked, so the output paragraph is empty and occupies no visible text.\n\nAFTER clicking the button — everything is the same except that the empty paragraph now reads:\n\nTry to figure out what this code does\n[ Run Code ]\nResult is: 120\nCarefully observe how the value changes. Can you recognize the pattern?\n\nNote where the new line appears: between the button and the sentence beginning \"Carefully observe\", because that is where the p with id=\"output\" sits in the document.\n\n(ii) Trace and explanation\n\nClicking the button fires onclick=\"process()\", which runs the function.\n\nx is set to 1 and limit is set to 5. The loop then runs from i = 1 while i is less than or equal to limit, multiplying x by i each time:\n\ni = 1 : x = 1 * 1 = 1\ni = 2 : x = 1 * 2 = 2\ni = 3 : x = 2 * 3 = 6\ni = 4 : x = 6 * 4 = 24\ni = 5 : x = 24 * 5 = 120\ni = 6 : 6 <= 5 is false, so the loop stops\n\nThe final value of x is 120. The last line then writes it into the page:\n\ndocument.getElementById(\"output\").innerHTML = \"Result is: \" + x;\n\ngetElementById(\"output\") finds the empty paragraph, and setting innerHTML replaces its contents with the text \"Result is: 120\". The + here is string concatenation, not addition, because the left operand is text.\n\nThe pattern the page asks you to recognise: the code computes the FACTORIAL of limit. It multiplies 1 x 2 x 3 x 4 x 5, which is 5! = 120. Change limit to 6 and the answer becomes 720.\n\nTwo details worth a mark each. The condition is i <= limit, so the loop runs five times including i = 5; with i < limit it would stop at 4 and print 24. And the result appears on the page rather than in the console because innerHTML was used — console.log would have produced a visibly unchanged page.",
    keyPoints: [
      "Before: heading, button and the second paragraph; the output paragraph is empty",
      "After: the output paragraph reads \"Result is: 120\"",
      "The loop multiplies x by i for i = 1 to 5: 1, 2, 6, 24, 120",
      "It computes the factorial of limit — 5! = 120",
      "i <= limit runs five times; i < limit would stop at 24",
      "innerHTML writes the result into the page, which is why it is visible"
    ],
    repeats: 2
  },

  {
    id: "fin-rev-21-trace",
    chapter: 10,
    source: "final",
    sourceLabel: "Revision Q21",
    papers: ["revision"],
    type: "open",
    marks: 15,
    question: "Referring to the following code: (a) show the output web page before and after clicking the button, and (b) trace and explain the output.",
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>Print 1 to n</title>
  </head>
  <body>
    <h2>Print numbers from 1 to n</h2>

    <input type="number" id="number">
    <button type="button" onclick="show()">Run Code</button>
    <p id="output"></p>

    <script>
      function show() {
        var n = parseInt(document.getElementById("number").value);
        var result = "";
        for (let i = 1; i <= n; i++) {
          result += i + " ";
        }
        document.getElementById("output").innerHTML = result;
      }
    </script>
  </body>
</html>`,
    modelAnswer: "(a) The output web page\n\nBEFORE clicking the button — the tab reads \"Print 1 to n\" and the page shows:\n\nPrint numbers from 1 to n        (an h2 heading)\n[      ] [ Run Code ]            (an empty number box, then the button)\n                                 (the output paragraph is EMPTY)\n\nThe function is defined but never called, so nothing has run and the output paragraph is empty.\n\nAFTER typing a value and clicking the button — suppose the user types 5:\n\nPrint numbers from 1 to n\n[  5   ] [ Run Code ]\n1 2 3 4 5\n\nThe output paragraph now contains 1 2 3 4 5 with a trailing space. The heading, the input and the button are unchanged, and the number the user typed stays in the box.\n\n(b) Trace and explanation\n\nClicking the button fires onclick=\"show()\".\n\nStep 1. document.getElementById(\"number\").value reads what is in the input box. That value is always a STRING, even from a number input, so \"5\" comes back rather than 5. parseInt converts it to the number 5 and stores it in n. Without parseInt, i <= n would be comparing a number with a string and result += i would concatenate rather than add.\n\nStep 2. result is set to an empty string, ready to be built up.\n\nStep 3. The loop runs from i = 1 while i <= n, appending the number and a space each pass:\n\ni = 1 : result = \"1 \"\ni = 2 : result = \"1 2 \"\ni = 3 : result = \"1 2 3 \"\ni = 4 : result = \"1 2 3 4 \"\ni = 5 : result = \"1 2 3 4 5 \"\ni = 6 : 6 <= 5 is false, so the loop stops\n\nStep 4. innerHTML puts that string into the paragraph, so the page displays 1 2 3 4 5.\n\nEdge cases worth mentioning, because they are easy marks:\n\n- If the box is left empty, parseInt(\"\") returns NaN. Every comparison with NaN is false, so i <= n fails immediately, the loop body never runs, result stays empty, and the page shows nothing at all.\n- If the user types 0 or a negative number, the loop again never runs and nothing is displayed.\n- The output ends with a trailing space, because the space is appended after every number including the last.\n- Because result is built with + on a string, i is converted to text as it is appended — this is concatenation, not arithmetic.\n\nThe difference from the factorial version in the final paper: this one ADDS each number onto a string to display a sequence, whereas that one MULTIPLIES the numbers together to produce a single value.",
    keyPoints: [
      "Before: heading, empty number box, button; output paragraph empty",
      "After typing 5 and clicking: the paragraph shows 1 2 3 4 5",
      "input.value is always a string, so parseInt converts it to a number",
      "The loop appends i and a space to result while i <= n",
      "Empty, zero or negative input means the loop never runs and nothing is shown",
      "innerHTML writes the built-up string into the page"
    ],
    repeats: 2
  }

];
