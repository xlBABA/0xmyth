/* ==========================================================================
   questions-midterm.js
   Past midterm papers for BIC1234 / CC106 — Papers A, B and C.

   Every question here was actually on a paper. Nothing has been invented:
   Paper A pages 2 and 4 (Q8–15, Q23–29) and Paper B page 4 were never
   photographed, and they are simply absent rather than filled in.

   A question asked on more than one paper is stored ONCE, lists every paper
   it appeared on in `papers`, and carries `repeats` — the number of separate
   appearances across the whole bank. That is what the ★ marker and the
   "high priority" filter key off.

   All three midterms cover Chapters 1–6 only. No HTML, CSS or JavaScript
   appears on any midterm; that material is examined in the final.

   Shape (matches questions-tutorials.js, extended):
     id, chapter, source: "midterm", sourceLabel, papers[], type,
     question, options[]/answer | blanks[] | modelAnswer, explanation,
     keyPoints[], marks, repeats

   Loaded as a plain script (no fetch), so this works from file:// too.
   ========================================================================== */

const MIDTERM_QUESTIONS = [

  /* ============================================ PAPER A — OBJECTIVE ====== */

  {
    id: "mid-a-01",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper A · Q1",
    papers: ["paper-a"],
    type: "mcq",
    question: "How are the terms “Internet” and “Web” commonly used?",
    options: [
      "They are both forms of accessing information over the medium of the Internet",
      "They are used interchangeably, although they refer to different concepts",
      "They are both physical networks that connect computers globally"
    ],
    answer: 1,
    explanation: "In everyday speech people swap the two words freely, but they are not the same thing. The Internet is the physical network that connects millions of computers together globally and lets them communicate. The Web is a way of accessing information over the medium of the Internet — a collection of web pages reached with a browser. The Web runs on top of the Internet, not the other way round.",
    keyPoints: [
      "Used interchangeably in speech, but they are different concepts",
      "Internet = the physical network infrastructure",
      "Web = one way of accessing information over that network"
    ]
  },

  {
    id: "mid-a-02",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper A · Q2",
    papers: ["paper-a"],
    type: "mcq",
    question: "Who publishes the standards and guidelines for the World Wide Web?",
    options: [
      "Private and public IT companies",
      "The World Wide Web Consortium (W3C)",
      "The Internet Service Providers (ISPs)"
    ],
    answer: 1,
    explanation: "The standards and guidelines for the Web are published by the World Wide Web Consortium (W3C). Do not confuse this with funding: no one owns the Internet, and it is mostly funded by private and public IT companies — but funding it is not the same as setting its standards.",
    keyPoints: [
      "Standards and guidelines: W3C",
      "No one owns the Internet",
      "Funding mostly comes from private and public IT companies"
    ]
  },

  {
    id: "mid-a-03",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper A · Q3",
    papers: ["paper-a"],
    type: "mcq",
    question: "Which of the following services is commonly provided by the Internet?",
    options: [
      "Satellite television",
      "Online shopping",
      "Postal mail delivery"
    ],
    answer: 1,
    explanation: "The services the Internet generally provides are communicating, searching, education and e-learning, online shopping, digital banking and social networking. Satellite television is broadcast over satellite rather than over the Internet, and postal mail is a physical delivery service.",
    keyPoints: [
      "Internet services: communicating, searching, e-learning, online shopping, digital banking, social networking"
    ]
  },

  {
    id: "mid-a-04",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper A · Q4",
    papers: ["paper-a"],
    type: "mcq",
    question: "In the context of email architecture, what role does POP serve?",
    options: [
      "Encrypts email messages.",
      "Translates domain names to IP addresses.",
      "Downloads emails from the server to the client's machine.",
      "Routes emails through the internet."
    ],
    answer: 2,
    explanation: "POP — Post Office Protocol — handles incoming messages and downloads them from the mail server onto the local device. Translating domain names to IP addresses is DNS, routing an email along its path is SMTP, and encryption is not a job of any of these three.",
    keyPoints: [
      "POP handles incoming mail and downloads it locally",
      "SMTP decides which paths a message takes — outgoing",
      "IMAP also retrieves mail, but leaves it on the server"
    ]
  },

  {
    id: "mid-a-05",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper A · Q5",
    papers: ["paper-a"],
    type: "mcq",
    question: "Which of the following best describes the function of a firewall in networking?",
    options: [
      "Monitors and filters incoming and outgoing network traffic",
      "Provides a dynamic IP address to the network devices",
      "Encrypts sensitive data being transmitted over a network"
    ],
    answer: 0,
    explanation: "A firewall is a program — usually on an Internet gateway server — that protects the resources of one network from users on other networks. It sits between a private network and everything external and decides what traffic is allowed through. Handing out dynamic IP addresses is DHCP, and encrypting data in transit is encryption.",
    keyPoints: [
      "Firewall = security buffer between a private network and external networks",
      "It monitors and filters traffic in both directions",
      "Purpose: stop outsiders reaching your own private data resources"
    ]
  },

  {
    id: "mid-a-06",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper A · Q6",
    papers: ["paper-a"],
    type: "mcq",
    question: "How do email and postal mail services compare in terms of environmental impact?",
    options: [
      "Email is more environmentally friendly than postal mail services.",
      "Both email and postal mail services have similar environmental impacts.",
      "Postal mail services are more environmentally friendly than email."
    ],
    answer: 0,
    explanation: "Email is more environmentally friendly. It uses no paper, no envelopes, no ink and no physical transport, whereas postal mail consumes paper and requires vehicles to carry it. Email is also far quicker and easier to handle, which is why it has become such a useful tool for reaching people.",
    keyPoints: [
      "Email: no paper, no envelopes, no physical transport",
      "Postal mail: paper, printing and vehicle transport",
      "Email is also far faster — seconds rather than days"
    ]
  },

  {
    id: "mid-a-07",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper A · Q7",
    papers: ["paper-a"],
    type: "mcq",
    question: "Which generation of the Web is associated with the rise of social media platforms, user-generated content, and collaborative web applications?",
    options: ["Web 1.0", "Web 2.0", "Web 3.0"],
    answer: 1,
    explanation: "Web 2.0 (post-2001) is marked by the emergence of dynamic web pages, rich media content and interactive platforms such as social media, along with improved bandwidth. Web 1.0 (1991–2001) was static pages with one-way communication, and Web 3.0 is the Semantic Web.",
    keyPoints: [
      "Web 1.0 (1991–2001): static pages, linear content, one-way communication",
      "Web 2.0 (post-2001): dynamic pages, rich media, social and interactive platforms",
      "Web 3.0: the Semantic Web — machine-processable, interconnected data"
    ]
  },

  {
    id: "mid-a-16",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper A · Q16 · Paper B · MCQ 5",
    papers: ["paper-a", "paper-b"],
    type: "mcq",
    question: "What are the three primary privacy issues?",
    options: [
      "Property, access, and ethics",
      "Accuracy, security, and access",
      "Ethics, security, and access",
      "Accuracy, property, and access"
    ],
    answer: 3,
    explanation: "The three primary privacy issues are accuracy, property and access. Do not confuse these with the three most significant concerns of computer security — privacy, security and ethics — which is exactly the confusion the wrong options are built out of.",
    keyPoints: [
      "Accuracy — the responsibility of those who collect data",
      "Property — who owns the data and who has rights to the software usage",
      "Access — the control of access to the data by authorised users",
      "Not to be confused with privacy / security / ethics, the three security concerns"
    ],
    repeats: 2
  },

  {
    id: "mid-a-17",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper A · Q17",
    papers: ["paper-a"],
    type: "mcq",
    question: "Which generation of the Web is envisioned as the “Semantic Web”, where data is interconnected and machine-readable, enabling advanced artificial intelligence applications?",
    options: ["Web 1.0", "Web 2.0", "Web 3.0"],
    answer: 2,
    explanation: "Web 3.0 is the Semantic Web. It represents the evolution of the Web into a semantic, interconnected data space where advanced algorithms and new standards allow machine processing of content, leading to smarter search engines and similar capabilities.",
    keyPoints: [
      "Web 3.0 = the Semantic Web",
      "Interconnected, machine-processable data",
      "Enables smarter search engines and AI applications"
    ],
    repeats: 3
  },

  {
    id: "mid-a-18",
    chapter: 5,
    source: "midterm",
    sourceLabel: "Paper A · Q18",
    papers: ["paper-a"],
    type: "mcq",
    question: "What is the primary purpose of arXiv as a free distribution service for research?",
    options: [
      "To serve as an online repository for preprints and e-prints of scientific papers",
      "To provide a platform for peer-reviewed publication of research articles",
      "To facilitate collaboration and networking among researchers in various fields"
    ],
    answer: 0,
    explanation: "arXiv is a free distribution service and open-access archive holding around two million scholarly articles in physics, mathematics, computer science and other fields. The key word is archive: it hosts preprints and e-prints. It is not itself a peer-review venue, which is what separates a preprint on arXiv from a published, peer-reviewed article.",
    keyPoints: [
      "arXiv = free distribution service and open-access archive",
      "Holds preprints and e-prints, roughly two million articles",
      "Fields: physics, mathematics, computer science and others",
      "Not peer reviewed — that is the difference from a published article"
    ]
  },

  {
    id: "mid-a-19",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper A · Q19 · Paper B · MCQ 6",
    papers: ["paper-a", "paper-b"],
    type: "mcq",
    question: "What is a recommended step to protect your privacy when using public Wi-Fi networks?",
    options: [
      "Sharing sensitive information and passwords freely",
      "Using a virtual private network (VPN) for secure connections",
      "Backup the data and system",
      "Disabling firewalls and antivirus software on your device"
    ],
    answer: 1,
    explanation: "A VPN creates an encrypted connection, so anything you send over a shared or rogue hotspot is unreadable to whoever is watching that network. Backing up data is good practice but does nothing for privacy on a hostile network, and disabling your firewall or antivirus makes the situation worse.",
    keyPoints: [
      "VPN = an encrypted connection over an untrusted network",
      "Public Wi-Fi risk: rogue hotspots imitating legitimate free Wi-Fi to capture traffic",
      "Backups protect against loss, not against eavesdropping"
    ],
    repeats: 2
  },

  {
    id: "mid-a-20",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper A · Q20",
    papers: ["paper-a"],
    type: "mcq",
    question: "A Trojan horse is different from a worm because it:",
    options: [
      "is embedded in a legitimate program.",
      "does not require user interaction.",
      "replicates itself.",
      "always causes immediate damage."
    ],
    answer: 0,
    explanation: "A Trojan horse is a program disguised as something else — it hides inside or masquerades as legitimate software and triggers an action once run. A worm is the opposite: it fills a server with self-replicating information and spreads on its own without needing to be embedded in anything or waiting for a user.",
    keyPoints: [
      "Trojan horse: disguised as legitimate software, needs the user to run it",
      "Worm: self-replicating, spreads without user interaction",
      "Virus: migrates through networks and attaches to other programs and files"
    ],
    repeats: 2
  },

  {
    id: "mid-a-21",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper A · Q21 · Paper B · MCQ 7",
    papers: ["paper-a", "paper-b"],
    type: "mcq",
    question: "What type of security disaster can lead to unauthorized data access?",
    options: [
      "Cyber attacks",
      "Software updates",
      "Physical disasters",
      "Hardware failures"
    ],
    answer: 0,
    explanation: "Cyber attacks are the security disaster that leads to unauthorised access to data — intrusion, where hackers gain access without permission. Physical disasters and hardware failures destroy or interrupt access to data rather than exposing it, and software updates are routine maintenance.",
    keyPoints: [
      "The two security disasters organisations worry about: physical disasters and cyber attacks",
      "Unauthorised access specifically = cyber attacks / intrusion",
      "Intrusion, sabotage and natural disasters are the three computer security issues"
    ],
    repeats: 2
  },

  {
    id: "mid-a-22",
    chapter: 6,
    source: "midterm",
    sourceLabel: "Paper A · Q22",
    papers: ["paper-a"],
    type: "mcq",
    multi: true,
    question: "Which of the following are examples of PaaS? (Select ALL the correct answers.)",
    options: [
      "Google Applications",
      "Amazon Web Services",
      "IBM",
      "Google App Engine",
      "Rackspace"
    ],
    answer: [1, 3, 4],
    explanation: "PaaS — Platform as a Service — gives clients a platform on which to deploy and host their own applications without having to set up infrastructure, storage, servers or networking. Amazon Web Services, Google App Engine and Rackspace are the platform examples here. Google Applications is SaaS, because you use finished software over the Internet by subscription. IBM appears in the notes as an IaaS example, providing just the hardware and network.",
    keyPoints: [
      "PaaS = a platform to deploy and host your own applications",
      "PaaS examples: Amazon Web Services, Microsoft Azure, Google App Engine, Rackspace",
      "SaaS example: Google Applications, Salesforce — finished software over the Internet",
      "IaaS example: IBM, Amazon AWS — just hardware and network, you install the software"
    ]
  },

  {
    id: "mid-a-30",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper A · Q30",
    papers: ["paper-a"],
    type: "mcq",
    question: "In the process of sending an email, what is the role of the Mail Transfer Agent (MTA)?",
    options: [
      "It provides a web interface for writing, sending, and receiving emails.",
      "It encrypts the email content before it's sent over the internet.",
      "It routes the email from the sender's server to the recipient's server.",
      "It converts the email from HTML to plain text."
    ],
    answer: 2,
    explanation: "The Mail Transfer Agent is the server-side component that moves a message onwards — it routes the email from the sender's mail server to the recipient's mail server using SMTP. The web interface you type into is the mail client (the Mail User Agent), and encoding non-text content is the job of MIME.",
    keyPoints: [
      "MTA routes mail between mail servers using SMTP",
      "MUA (mail client) is what the user writes in",
      "Mail server determines from the recipient's address which route to send the message on"
    ]
  },

  /* ============================================ PAPER B — OBJECTIVE ====== */

  {
    id: "mid-b-mcq-01",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · MCQ 1",
    papers: ["paper-b"],
    type: "mcq",
    question: "Which encryption algorithm is widely used in securing wireless networks?",
    options: ["HTTPs", "PGP", "WPA / WPA2", "DoS / DoS2"],
    answer: 2,
    explanation: "Wireless network encryption uses WPA or WPA2. The notes list five common cases of encryption: email, files, websites, VPN connections and wireless networks using WPA or WPA2. HTTPS secures web traffic rather than the wireless link itself, and DoS is an attack, not an algorithm.",
    keyPoints: [
      "Wireless network encryption: WPA / WPA2",
      "Cases of encryption: email, files, websites, VPN, wireless networks",
      "DoS is a denial-of-service attack, not encryption"
    ]
  },

  {
    id: "mid-b-mcq-02",
    chapter: 5,
    source: "midterm",
    sourceLabel: "Paper B · MCQ 2",
    papers: ["paper-b"],
    type: "mcq",
    question: "When conducting online research, what is the purpose of cross-referencing multiple sources?",
    options: [
      "To save time by limiting the number of sources consulted",
      "To validate the accuracy of information",
      "To intentionally introduce conflicting information"
    ],
    answer: 1,
    explanation: "Cross-referencing means checking the same claim in more than one independent source in order to validate its accuracy. It is the same reasoning behind the safe way to use Wikipedia: scan the article for general information and terms, then scan it for references and go and read those instead.",
    keyPoints: [
      "Cross-referencing validates accuracy",
      "Anything found in only one place should be treated with suspicion",
      "Safe use of Wikipedia: take the terms and the references, not the article itself"
    ]
  },

  {
    id: "mid-b-mcq-03",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper B · MCQ 3",
    papers: ["paper-b"],
    type: "mcq",
    question: "Which generation of the Web is characterized by the transition from static web pages to dynamic and interactive web content?",
    options: ["Web 1.0", "Web 2.0", "Web 3.0"],
    answer: 1,
    explanation: "Web 2.0 is the transition itself. Web 1.0 was the static half of that sentence and Web 3.0 is a later step again, so the generation that marks the change from static to dynamic and interactive is Web 2.0.",
    keyPoints: [
      "Web 2.0 (post-2001): dynamic pages, rich media, interactive platforms, better bandwidth",
      "The change is away from Web 1.0's static pages and one-way communication"
    ]
  },

  {
    id: "mid-b-mcq-04",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · MCQ 4",
    papers: ["paper-b"],
    type: "mcq",
    question: "Which term refers to an individual's ability to eliminate the collection, use, and sale of confidential personal information?",
    options: ["Security", "Property", "Accuracy", "Privacy"],
    answer: 3,
    explanation: "That is the definition of privacy: an individual's ability to eliminate the collection, use and sale of confidential personal information. Accuracy and property are two of the three privacy issues rather than the definition of privacy itself, and security is about access to sensitive information and the control of hardware and software.",
    keyPoints: [
      "Privacy = the ability to eliminate collection, use and sale of confidential personal information",
      "Accuracy, property and access are the three issues *within* privacy",
      "Privacy, security and ethics are the three main computer security concerns"
    ]
  },

  {
    id: "mid-b-mcq-08",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · MCQ 8",
    papers: ["paper-b"],
    type: "mcq",
    question: "What is Phishing?",
    options: [
      "The practice of sending emails pretending to be from reputable sources to induce individuals to reveal personal information",
      "The act of physically stealing someone's computer or mobile device",
      "A type of software that provides enhanced features for a fee",
      "A technique used to infect computers with malware"
    ],
    answer: 0,
    explanation: "Phishing is a social engineering attack: a scammer sends messages that look official and tricks the user into a fake but official-looking site or into handing over personal information. Note the wrong option about malware — malware may follow, but phishing itself is the deception, not the infection.",
    keyPoints: [
      "Phishing is a type of social engineering",
      "Fake but official-looking messages and sites",
      "Related forms: vishing (voice), smishing (SMS), pretexting, baiting, quid pro quo"
    ]
  },

  {
    id: "mid-b-mcq-09",
    chapter: 6,
    source: "midterm",
    sourceLabel: "Paper B · MCQ 9",
    papers: ["paper-b"],
    type: "mcq",
    question: "Which cloud service provides just the hardware and network, requiring clients to install and develop their own software and applications?",
    options: ["IaaS", "PaaS", "SaaS"],
    answer: 0,
    explanation: "IaaS — Infrastructure as a Service — provides just the hardware and the network; the client installs and develops the software and applications. PaaS goes one level up and provides a platform to deploy your own applications onto, and SaaS goes further still and provides finished software over the Internet.",
    keyPoints: [
      "IaaS: hardware and network only — examples Amazon AWS, IBM",
      "PaaS: a platform to deploy your own apps — examples AWS, Microsoft Azure, Rackspace",
      "SaaS: finished software by subscription — examples Google Applications, Salesforce"
    ]
  },

  {
    id: "mid-b-mcq-10",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper B · MCQ 10",
    papers: ["paper-b"],
    type: "mcq",
    question: "What technology does the Internet use to ensure data sent between computers is received accurately and in order?",
    options: ["SMTP", "TCP", "HTTP", "POP"],
    answer: 1,
    explanation: "TCP — Transmission Control Protocol — is the half of TCP/IP responsible for reliable delivery: it breaks data into packets and makes sure they arrive accurately and in the correct order. IP handles addressing and getting packets to the right machine but does not guarantee order. SMTP and POP are mail protocols and HTTP is for exchanging files on the Web.",
    keyPoints: [
      "TCP: reliable, ordered delivery of packets",
      "IP: addressing and routing, no ordering guarantee",
      "TCP/IP together = the protocol suite that lets computers share resources across a network"
    ],
    repeats: 3
  },

  /* ================================ PAPER B / C — FILL IN THE BLANK ====== */

  {
    id: "mid-blank-arpanet",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper B · Blank 1 · Paper C · Blank 21",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "The Internet began as a project called ______, designed to connect computers for communication and data sharing.",
    blanks: [{ accepts: ["ARPANET", "the ARPANET project", "ARPA net", "Advanced Research Projects Agency Network"] }],
    explanation: "The Internet began with the ARPANET project in 1969. Do not confuse that date with 1989, which is when Sir Tim Berners-Lee invented the World Wide Web — twenty years later, and a different invention.",
    repeats: 2
  },

  {
    id: "mid-blank-ransomware",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 2 · Paper C · Blank 14",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "______ is a type of cyber-crime that locks or encrypts a user's data and demands payment to unlock and restore the access.",
    blanks: [{ accepts: ["Ransomware"] }],
    explanation: "Ransomware is malicious software that encrypts your computer data and then ransoms the password back to you. It sits in the list of computer crimes alongside identity theft, Internet scams, DoS and DDoS, data manipulation, cyberbullying and sexual predation.",
    repeats: 2
  },

  {
    id: "mid-blank-internet",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper B · Blank 3 · Paper C · Blank 7",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "The physical network that connects millions of computers globally is called the ______.",
    blanks: [{ accepts: ["Internet", "the Internet"] }],
    explanation: "The Internet is the physical network that connects millions of computers together globally and allows them to communicate. The Web, by contrast, is a way of accessing information over that network.",
    repeats: 2
  },

  {
    id: "mid-blank-cyberbullying",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 4 · Paper C · Blank 3",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "The use of the Internet to harm or bully others online is referred to as ______.",
    blanks: [{ accepts: ["cyberbullying", "cyber bullying", "cyber-bullying"] }],
    explanation: "Cyberbullying is the use of the Internet or any device to hurt or embarrass another person. It is listed as a computer crime in its own right.",
    repeats: 2
  },

  {
    id: "mid-b-blank-05",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper B · Blank 5",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "The standard protocol used for sending data across networks is ______.",
    blanks: [{ accepts: ["TCP/IP", "TCP IP", "TCP-IP", "Transmission Control Protocol/Internet Protocol"] }],
    explanation: "TCP/IP — Transmission Control Protocol / Internet Protocol — is the set of protocols developed to allow cooperating computers to share resources across a network. It is the standard the whole Internet runs on."
  },

  {
    id: "mid-b-blank-06",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper B · Blank 6",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "Web 3.0 is also referred to as the ______, emphasizing intelligent data processing.",
    blanks: [{ accepts: ["Semantic Web", "Semantic"] }],
    explanation: "Web 3.0 is the Semantic Web: the evolution of the Web into an interconnected data space where advanced algorithms and new standards allow machine processing of content, leading to smarter search engines.",
    repeats: 3
  },

  {
    id: "mid-blank-dns",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper B · Blank 7 · Paper C · Blank 19",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "The ______ translates domain names like www.google.com into IP addresses.",
    blanks: [{ accepts: ["DNS", "Domain Name System", "Domain Name Server"] }],
    explanation: "DNS is step two of how the Internet works: you type www.google.com, DNS translates it into an IP address such as 100.120.12.3, and only then can the request be routed.",
    repeats: 2
  },

  {
    id: "mid-b-blank-08",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 8",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "______ is the process of converting data into unreadable code to protect information.",
    blanks: [{ accepts: ["Encryption", "Encrypting"] }],
    explanation: "Encryption is coding information to make it unreadable except to those who are permitted to read it and hold the key to decode the message."
  },

  {
    id: "mid-blank-social-eng",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 9 · Paper C · Blank 16",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "The practice of manipulating and tricking people into revealing confidential information is known as ______.",
    blanks: [{ accepts: ["social engineering"] }],
    explanation: "Social engineering is the practice of manipulating people into divulging private data, through identity theft, Internet scams and data manipulation. Phishing, pretexting, baiting and quid pro quo are all types of social engineering attack.",
    repeats: 2
  },

  {
    id: "mid-b-blank-10",
    chapter: 6,
    source: "midterm",
    sourceLabel: "Paper B · Blank 10",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "______ cloud computing model provides access to software applications over the Internet.",
    blanks: [{ accepts: ["SaaS", "Software as a Service"] }],
    explanation: "SaaS — Software as a Service — provides clients with the ability to use software applications over the Internet by subscription, accessible from anywhere via the web. Examples: Google Applications and Salesforce."
  },

  {
    id: "mid-b-blank-11",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 11",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "A firewall that allows only specific network services, such as HTTP or FTP, is a ______.",
    blanks: [{ accepts: ["protocol firewall", "protocol", "protocol filtering firewall"] }],
    explanation: "In the list of firewall types, the protocol firewall is the one that decides, for each system on the network, which services are permitted on it. Watch the neighbouring types: a ports firewall restricts a service to specified port numbers, and a packet filtering firewall works on individual packets. Verify the exact wording your lecturer used for this one against the slides.",
    keyPoints: [
      "Packet filtering — decides which packets may flow through",
      "Proxy — acts as intermediary, hides your IP address",
      "Inspection — inspects each packet and decides whether to drop it",
      "IP address, domain name, protocol, ports and keyword filtering"
    ]
  },

  {
    id: "mid-blank-trojan",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 12 · Paper C · Blank 11",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "A ______ is a malware program that appears legitimate but performs harmful actions in the background.",
    blanks: [{ accepts: ["Trojan horse", "Trojan", "Trojan-horse"] }],
    explanation: "A Trojan horse is a program disguised as something else, or one that triggers an action once run. It is one of the three most common malware programs along with viruses and worms.",
    repeats: 2
  },

  {
    id: "mid-blank-web1",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper B · Blank 13 · Paper C · Blank 22",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "Web 1.0 is characterized by ______ web pages and ______ communication.",
    blanks: [
      { accepts: ["static"] },
      { accepts: ["one-way", "one way", "linear"] }
    ],
    explanation: "Web 1.0 ran from 1991 to 2001: the early stage of the World Wide Web, characterised by static web pages with linear content, limited user interaction and one-way communication.",
    repeats: 2
  },

  {
    id: "mid-blank-zombie",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 14 · Paper C · Blank 5",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "A ______ is a computer that has been taken over by a hacker to perform malicious tasks.",
    blanks: [{ accepts: ["zombie", "zombie computer", "bot"] }],
    explanation: "A zombie is a computer connected to a network that has been compromised by a hacker or a virus. It appears under malicious hardware alongside rogue Wi-Fi hotspots and virus-infected USB flash drives.",
    repeats: 2
  },

  {
    id: "mid-b-blank-15",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper B · Blank 15",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "The ______ protocol ensures data packets are received in the correct order.",
    blanks: [{ accepts: ["TCP", "Transmission Control Protocol"] }],
    explanation: "TCP is the half of TCP/IP that guarantees reliable, ordered delivery. IP gets packets to the right address but makes no promise about the order they arrive in.",
    repeats: 3
  },

  {
    id: "mid-blank-smishing",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 16 · Paper C · Blank 18",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "______ is a phishing attack conducted through fake text messages that appear to come from trusted sources.",
    blanks: [{ accepts: ["smishing", "SMS phishing"] }],
    explanation: "Smishing is phishing carried out over SMS. Its siblings are vishing, which uses voice calls, and scareware, which frightens the victim into acting. All of them are social engineering attacks.",
    repeats: 2
  },

  {
    id: "mid-blank-dos",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 17 · Paper C · Blank 6",
    papers: ["paper-b", "paper-c"],
    type: "blank",
    marks: 1.5,
    question: "A ______ attack floods a network or server with traffic to slow down the system or deny access to legitimate users.",
    blanks: [{ accepts: ["DoS", "denial of service", "denial-of-service", "DDoS", "distributed denial of service"] }],
    explanation: "A denial of service (DoS) attack attempts to slow down or stop a computer by flooding it with requests. A distributed denial of service (DDoS) does the same thing from several computers at once.",
    repeats: 2
  },

  {
    id: "mid-b-blank-18",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 18",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "The process of converting ciphertext back into readable form is called ______.",
    blanks: [{ accepts: ["decryption", "decrypting", "deciphering"] }],
    explanation: "Encryption changes plain text into encrypted text; decryption is the reverse, turning ciphertext back into plain text using the key."
  },

  {
    id: "mid-b-blank-19",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 19",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "A person who finds vulnerabilities in systems for malicious purposes is known as a ______ hacker.",
    blanks: [{ accepts: ["black hat", "black-hat", "blackhat", "black"] }],
    explanation: "The three hacker types in the notes are white hat (ethical hackers, who break in for non-malicious purposes), black hat (who break in to destroy) and grey hat (who break in illegally to flaunt their expertise or to sell their services)."
  },

  {
    id: "mid-b-blank-20",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper B · Blank 20",
    papers: ["paper-b"],
    type: "blank",
    marks: 1.5,
    question: "In public-key encryption, the key used for decryption is called the ______ key.",
    blanks: [{ accepts: ["private", "secret"] }],
    explanation: "In public-key encryption the public key encrypts and the matching private key decrypts, which is why the private key is never shared. The summary sheet covers encryption in general rather than public-key encryption specifically, so check this one against your slides."
  },

  {
    id: "mid-c-blank-01",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper C · Blank 1",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "A ______ is a small text file stored on a user's computer by websites to track browsing activity.",
    blanks: [{ accepts: ["cookie"] }],
    explanation: "Cookies are small data or text files deposited on your hard disk by sites you have visited. They are harmless in themselves, but because they store information about your browsing habits and preferences, users worry that third parties will use them. A first-party cookie is generated by the site you are on; a third-party cookie by an advertising company working with it."
  },

  {
    id: "mid-c-blank-02",
    chapter: 6,
    source: "midterm",
    sourceLabel: "Paper C · Blank 2",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "The ability to automatically increase or decrease resources in cloud computing is called ______.",
    blanks: [{ accepts: ["scalability", "elasticity", "scaling"] }],
    explanation: "Scalability — flexibility of resources — means companies can easily increase or decrease the resources they use based on their current needs, without buying hardware."
  },

  {
    id: "mid-c-blank-04",
    chapter: 6,
    source: "midterm",
    sourceLabel: "Paper C · Blank 4",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "The ______ model of cloud computing offers a platform for developers to build, test, and deploy applications without managing infrastructure.",
    blanks: [{ accepts: ["PaaS", "Platform as a Service"] }],
    explanation: "PaaS provides a platform where clients deploy and host their own applications, free of the hassle of setting up infrastructure, storage, servers and networking. Examples: Amazon Web Services, Microsoft Azure, Google App Engine, Rackspace."
  },

  {
    id: "mid-c-blank-08",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper C · Blank 8",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "A computer that provides resources and services to other computers is called a ______.",
    blanks: [{ accepts: ["server"] }],
    explanation: "A server is a computer program that provides a service to other computer programs, on the same machine or on other machines. The requesting side of that relationship is the client."
  },

  {
    id: "mid-c-blank-09",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper C · Blank 9",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "The ______ protocol ensures reliable delivery and correct order of data packets over the network.",
    blanks: [{ accepts: ["TCP", "Transmission Control Protocol"] }],
    explanation: "TCP guarantees reliable, ordered delivery. Contrast it with blank 23 on the same paper: IP sends packets from one host to another but does not guarantee their order.",
    repeats: 3
  },

  {
    id: "mid-c-blank-10",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper C · Blank 10",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "A common method of protecting sensitive data during transmission is ______.",
    blanks: [{ accepts: ["encryption", "encrypting", "data encryption"] }],
    explanation: "Encryption codes information so that it is unreadable to anyone without the key. Cases include email, files, websites, VPN connections and wireless networks secured with WPA/WPA2."
  },

  {
    id: "mid-c-blank-12",
    chapter: 6,
    source: "midterm",
    sourceLabel: "Paper C · Blank 12",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "Cloud computing contributes to environmental sustainability by reducing the ______.",
    blanks: [{ accepts: ["carbon footprint", "energy consumption", "carbon emissions", "environmental impact"] }],
    explanation: "Sharing pooled data-centre resources means fewer machines are bought, powered and cooled overall, which reduces the carbon footprint. This is the green computing angle on cloud services — check the exact phrase your lecturer used on the slide."
  },

  {
    id: "mid-c-blank-13",
    chapter: 6,
    source: "midterm",
    sourceLabel: "Paper C · Blank 13",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "Google App Engine is an example of a ______ cloud computing service.",
    blanks: [{ accepts: ["PaaS", "Platform as a Service"] }],
    explanation: "Google App Engine gives you a platform to deploy and host your own application on without managing the infrastructure, which makes it PaaS. Google Applications, by contrast, is finished software you subscribe to — that is SaaS."
  },

  {
    id: "mid-c-blank-15",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper C · Blank 15",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "An organization that provides Internet connection to users is called an ______.",
    blanks: [{ accepts: ["ISP", "Internet Service Provider"] }],
    explanation: "The ISP is the organisation that connects you to the Internet and forwards your request onwards — step three of how the Internet works, after you type the address and DNS resolves it."
  },

  {
    id: "mid-c-blank-17",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper C · Blank 17",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "______ Web is a term used to describe the future of the Internet where machines can understand and interpret data.",
    blanks: [{ accepts: ["Semantic", "Semantic Web", "Web 3.0"] }],
    explanation: "The Semantic Web is Web 3.0 — an interconnected data space where new standards and advanced algorithms let machines process the content itself.",
    repeats: 3
  },

  {
    id: "mid-c-blank-20",
    chapter: 6,
    source: "midterm",
    sourceLabel: "Paper C · Blank 20",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "______ computing allows users to access services like storage and applications through the Internet without needing local infrastructure.",
    blanks: [{ accepts: ["cloud", "cloud computing"] }],
    explanation: "Cloud services shift computing activities from the user's desktop to computers on the Internet. Its three basic components are the clients (end users), the service providers and the Internet itself."
  },

  {
    id: "mid-c-blank-23",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper C · Blank 23",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "The ______ protocol is used to send data packets from one host to another across networks but does not guarantee order.",
    blanks: [{ accepts: ["IP", "Internet Protocol"] }],
    explanation: "IP handles addressing and delivery between hosts; TCP is the half of the pair that adds reliability and ordering. This blank and blank 9 on the same paper are deliberately a matched pair."
  },

  {
    id: "mid-c-blank-24",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper C · Blank 24",
    papers: ["paper-c"],
    type: "blank",
    marks: 1,
    question: "The crime of using someone else's personal information, such as name or financial details, without permission is called ______.",
    blanks: [{ accepts: ["identity theft"] }],
    explanation: "Identity theft is the illegal assumption of a person's identity for bad gain. It is the first entry in the computer crime table, and social engineering is one of the ways it is carried out."
  },

  /* ============================================= OPEN-ENDED — MIDTERM ==== */

  {
    id: "mid-open-smtp",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper A · Essay 1(i) · Paper C · Q1(ii)",
    papers: ["paper-a", "paper-c"],
    type: "open",
    marks: 3,
    question: "Define the term SMTP.",
    modelAnswer: "SMTP stands for Simple Mail Transfer Protocol.\n\nIt is the protocol that decides which paths an email message will take on the Internet. When you press send, your mail client hands the message to the SMTP server of your email service provider. That server checks whether the recipient's domain is the same as yours: if it is, it redirects the message internally; if it is not, it queries a DNS server for the IP address of the recipient's mail server and sends the message on to it over the Internet.\n\nIn short, SMTP is the outgoing protocol — it moves mail from sender to recipient's server. POP and IMAP are the incoming protocols that retrieve it from that server afterwards.",
    keyPoints: [
      "Simple Mail Transfer Protocol",
      "Decides which paths an email message takes on the Internet",
      "Outgoing / sending side, server to server",
      "Contrast: POP and IMAP retrieve mail on the receiving side"
    ],
    repeats: 2
  },

  {
    id: "mid-open-pop",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper C · Q1(i)",
    papers: ["paper-c"],
    type: "open",
    marks: 2,
    question: "Define the term POP.",
    modelAnswer: "POP stands for Post Office Protocol.\n\nIt is the protocol that handles incoming messages: it downloads mail from the mail server onto the local device so it can be read there. Because the messages are pulled down to one machine, POP suits a single device and is rarely used today.\n\nIMAP is the alternative. It also retrieves mail from a server, but it lets the client read the message on the server without downloading it, so the same mailbox stays consistent across several devices.",
    keyPoints: [
      "Post Office Protocol",
      "Handles incoming messages, downloads them to the local device",
      "Contrast with IMAP, which leaves messages on the server"
    ]
  },

  {
    id: "mid-open-tcpip",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper A · Essay 1(ii)",
    papers: ["paper-a"],
    type: "open",
    marks: 3,
    question: "Define the term TCP/IP.",
    modelAnswer: "TCP/IP stands for Transmission Control Protocol / Internet Protocol.\n\nIt is a set of protocols developed to allow cooperating computers to share resources across a network, and it is the foundation the whole Internet runs on.\n\nThe two halves do different jobs. TCP breaks data into packets and guarantees that they arrive accurately and in the correct order, reassembling them at the far end. IP handles addressing and routing — getting each packet to the right machine — but on its own makes no promise about the order in which they arrive.\n\nIn the seven steps of how the Internet works, TCP/IP is the step where the web server sends the page back to you in packets and IP ensures they reach you.",
    keyPoints: [
      "Transmission Control Protocol / Internet Protocol",
      "A set of protocols letting cooperating computers share resources across a network",
      "TCP: reliable, ordered delivery of packets",
      "IP: addressing and routing, no ordering guarantee"
    ]
  },

  {
    id: "mid-open-isp",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper A · Essay 1(iii)",
    papers: ["paper-a"],
    type: "open",
    marks: 3,
    question: "Define the term ISP.",
    modelAnswer: "ISP stands for Internet Service Provider.\n\nAn ISP is the organisation that provides you with a connection to the Internet — for example STC. It supplies the physical connection into your home or office and forwards your requests out onto the Internet, and it carries the responses back to you.\n\nIn the seven steps of how the Internet works, the ISP is step three: after you type an address and DNS translates it into an IP address, your ISP connects you to the web and sends the request onwards. Where traffic has to cross between different ISPs, a NAP (Network Access Point) helps exchange it and route the data between your ISP and the web server.\n\nAccessing the Internet at all needs three things: a device, an ISP to provide the physical connection, and a modem or router at your end.",
    keyPoints: [
      "Internet Service Provider",
      "Provides the physical connection to the Internet",
      "Forwards your requests onto the Internet and carries responses back",
      "Step 3 of the seven steps of how the Internet works"
    ]
  },

  {
    id: "mid-open-webserver",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper A · Essay 1(iv) · Paper C · Q1(iii)",
    papers: ["paper-a", "paper-c"],
    type: "open",
    marks: 3,
    question: "Define the term Web Server.",
    modelAnswer: "A web server stores and transmits web documents.\n\nIt uses the HTTP protocol to connect to other computers and distribute information: a browser sends an HTTP request for a page, and the web server finds the file and sends it back. It is the server half of the client/server relationship, where the browser is the client making the request.\n\nExamples of web server software are Apache, Nginx and IIS.\n\nDo not confuse the terms. A server in general is a computer program that provides a service to other computer programs. A web server is the specific kind that stores a website's files and serves them over HTTP.",
    keyPoints: [
      "Stores and transmits web documents",
      "Uses HTTP to connect to other computers and distribute information",
      "Server half of the client/server relationship",
      "Examples: Apache, Nginx, IIS"
    ],
    repeats: 2
  },

  {
    id: "mid-open-webpage",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper A · Essay 1(v)",
    papers: ["paper-a"],
    type: "open",
    marks: 3,
    question: "Define the term Web Page.",
    modelAnswer: "A web page is a mixture of text, graphics, sound and animation in HTML format, which makes information accessible in an easy-to-understand form over the Internet.\n\nThe HTML format matters: HTML is a tagging language used to compose documents that will be viewed by a web browser, and it was adopted so that whatever computer platform someone is using, their browser knows how to display the document.\n\nA single web page is one such document. A collection of web pages connected by clickable hypertext links is a website.",
    keyPoints: [
      "A mixture of text, graphics, sound and animation in HTML format",
      "Makes information accessible in an easy-to-understand format over the Internet",
      "HTML is platform-independent so any browser can display it",
      "Many web pages linked together make a website"
    ]
  },

  {
    id: "mid-open-website",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper A · Essay 1(vi) · Paper C · Q1(iv)",
    papers: ["paper-a", "paper-c"],
    type: "open",
    marks: 3,
    question: "Define the term Website.",
    modelAnswer: "A website is a collection of web pages connected by clickable hypertext links.\n\nThe pages usually sit under one domain and are navigated by following links from one to another. Once a website has been designed it must be hosted: stored on a computer that can be reached through the Internet and the World Wide Web, so that a browser anywhere can request its pages.\n\nKeep the three terms in order: a web page is one document, a website is a linked collection of them, and web hosting is the storage that makes that collection reachable.",
    keyPoints: [
      "A collection of web pages connected by hypertext clickable links",
      "Usually under a single domain",
      "Website hosting: storing it on a computer reachable through the Internet"
    ],
    repeats: 2
  },

  {
    id: "mid-a-open-e2",
    chapter: 2,
    source: "midterm",
    sourceLabel: "Paper A · Essay 2",
    papers: ["paper-a"],
    type: "open",
    marks: 6,
    question: "Briefly describe the connection structure when you are connected to the Internet.",
    modelAnswer: "The clearest way to answer this is to walk the seven steps the notes use for “how the Internet works”, because they are exactly the connection structure.\n\n1. You — you type www.google.com into your browser.\n2. DNS — the Domain Name System translates www.google.com into an IP address such as 100.120.12.3.\n3. ISP — your Internet Service Provider connects you to the Internet and sends the request onwards.\n4. NAP — where the request has to cross between providers, a Network Access Point exchanges traffic between ISPs and routes the data on towards the web server.\n5. HTTP — your browser uses HTTP to request the Google home page from that server.\n6. TCP/IP — Google's server sends the page back in packets; TCP guarantees they arrive in order and IP ensures they reach your machine.\n7. You — the page is reassembled and appears on your screen.\n\nPut in terms of equipment, the structure is: your device, a modem or router, the physical connection provided by your ISP, and beyond it the wider network of ISPs and NAPs leading to the web server that holds the page.",
    keyPoints: [
      "You → DNS → ISP → NAP → HTTP → TCP/IP → You",
      "DNS resolves the name to an IP address",
      "The ISP provides the physical connection and forwards the request",
      "NAPs exchange traffic between different ISPs",
      "HTTP carries the request; TCP/IP carries the reply back in ordered packets"
    ]
  },

  {
    id: "mid-open-encryption",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper A · Essay 3 · Paper C · Q5",
    papers: ["paper-a", "paper-c"],
    type: "open",
    marks: 7,
    question: "What is the main function of encryption? And list down TWO (2) significant drawbacks of it.",
    modelAnswer: "Main function\n\nEncryption is the coding of information so that it is unreadable to everyone except those who are permitted to read it and hold the key to decode the message. Encrypting changes plain text into encrypted text (ciphertext); decryption reverses it. Its main function, therefore, is confidentiality: protecting data from being read by anyone who intercepts it, whether it is sitting on a disk or travelling across a network.\n\nCommon cases of encryption in the notes are email, files, websites, VPN connections, and wireless networks secured with WPA or WPA2.\n\nTwo significant drawbacks\n\n1. It slows things down. Encrypting and decrypting costs processing time and consumes bandwidth, so the flow of data is slower than it would be in plain form.\n2. It adds complexity, and files get bigger. Keys have to be generated, distributed and kept safe, which complicates communication — and if the key is lost, the data is lost with it. Encrypted files are also larger than the originals.\n\nA useful third point if the marks allow: encryption protects the honest and the dishonest equally, so criminals use it to hide their own traffic from investigators.",
    keyPoints: [
      "Coding information so it is unreadable except to those holding the key",
      "Encrypt = plain text → ciphertext; decrypt = the reverse",
      "Cases: email, files, websites, VPN, wireless (WPA/WPA2)",
      "Drawback 1: reduces speed of data flow and consumes bandwidth",
      "Drawback 2: adds complexity to communication, increases file size, key loss means data loss"
    ],
    repeats: 2
  },

  {
    id: "mid-open-virus-email",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper A · Essay 4 · Paper C · Q4",
    papers: ["paper-a", "paper-c"],
    type: "open",
    marks: 9,
    question: "Based on the illustration (“Until the virus has been identified and removed, IT has issued an immediate ban on any use of e-mail attachments. For more details, please refer to the attached document.”), describe THREE (3) main ways to prevent virus attack via email attachment. Elaborate your answer.",
    modelAnswer: "The joke in the illustration is that the warning about attachments arrives as an attachment — which is itself the lesson: an attachment that looks official is exactly how the attack works.\n\n1. Be alert to email scams, and do not open attachments you were not expecting.\nMost infections arrive because someone opened a file from a message that looked legitimate. Check who the sender really is rather than what the display name says, be suspicious of urgency and of any message asking you to open a document to “see details”, and never open executable attachments. Use an anti-SPAM program to filter mail before it reaches you. This is precisely the phishing pattern: a fake but official-looking message that induces the user to act.\n\n2. Install and keep updated a security suite — antivirus and anti-spyware.\nA security suite provides a collection of programs designed to protect your privacy and security while you are online. It scans attachments before they are opened and blocks known malicious files. It must be kept up to date, because it can only recognise what it has definitions for — which is why the notice in the illustration says “until the virus has been identified”.\n\n3. Use firewalls and restrict access, and back up your data and system.\nA firewall acts as a security buffer between the private network and all external networks and can block the traffic a malicious attachment tries to make once it runs. Restricting access limits how far an infection can spread from one machine. And regular backups mean that if an attachment does turn out to carry ransomware, the data can be restored rather than paid for.\n\nIf a fourth is wanted: stay away from dodgy websites, since the links inside such attachments usually lead to them.",
    keyPoints: [
      "Be alert to email scams — do not open unexpected attachments; use anti-SPAM filtering",
      "Install security suites / antivirus and keep the definitions updated",
      "Use firewalls and restrict access to limit what a running attachment can do",
      "Back up data and system so ransomware can be recovered from",
      "The illustration's own irony: the warning arrives as an attachment"
    ],
    repeats: 2
  },

  {
    id: "mid-b-open-to",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper B · Subjective 1(i)",
    papers: ["paper-b"],
    type: "open",
    marks: 2,
    question: "Describe the function of the “To” field in an email.",
    modelAnswer: "The To field is where the email address of the message's intended recipient is entered.\n\nIt names the person the message is actually addressed to and from whom a reply is expected. Everyone listed in To can see every other To and CC address on the message.\n\nAn email address in that field has two parts separated by an @ sign: the username, which identifies a person within an organisation, and the domain name, which specifies the server the mail is to be delivered to.",
    keyPoints: [
      "Holds the address of the intended recipient",
      "The person the message is actually for, and expected to reply",
      "Visible to all other To and CC recipients"
    ]
  },

  {
    id: "mid-b-open-cc",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper B · Subjective 1(ii)",
    papers: ["paper-b"],
    type: "open",
    marks: 2,
    question: "Describe the function of the “CC” field in an email.",
    modelAnswer: "CC stands for Carbon Copy.\n\nPutting an address in CC sends that person a copy of the email even though they are not the intended recipient of the message. It is how you keep someone informed — a supervisor, or a colleague who needs to know a conversation happened — without asking them to act on it.\n\nCC addresses are visible: everyone who receives the message can see who was copied. That is the whole difference between CC and BCC.",
    keyPoints: [
      "Carbon Copy",
      "Sends a copy to someone who is not the intended recipient",
      "Used to keep people informed rather than to ask them to act",
      "CC addresses are visible to all recipients"
    ]
  },

  {
    id: "mid-b-open-bcc",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper B · Subjective 1(iii)",
    papers: ["paper-b"],
    type: "open",
    marks: 2,
    question: "Describe the function of the “BCC” field in an email.",
    modelAnswer: "BCC stands for Blind Carbon Copy.\n\nAnyone in the BCC list receives a copy of the message, but their name is not included in the message headers, so no one else who received the message knows they were sent a copy.\n\nThat gives it two uses. First, privacy: when mailing a large group, BCC stops every recipient from seeing every other recipient's address. Second, discretion: it copies someone in without announcing it to the other readers.\n\nThe contrast to remember for the exam is simply visibility. CC recipients are visible to everyone; BCC recipients are hidden.",
    keyPoints: [
      "Blind Carbon Copy",
      "Recipients get a copy but their names are not in the message headers",
      "No one else knows they were copied",
      "Protects the privacy of addresses when mailing a large group"
    ]
  },

  {
    id: "mid-b-open-pop-smtp",
    chapter: 3,
    source: "midterm",
    sourceLabel: "Paper B · Subjective 2",
    papers: ["paper-b"],
    type: "open",
    marks: 5,
    question: "Describe how the POP3 and SMTP protocols function in sending and receiving emails.",
    modelAnswer: "The two protocols cover opposite halves of the journey. SMTP pushes mail outwards; POP3 pulls it down at the other end.\n\nSMTP — Simple Mail Transfer Protocol — sending\n\nWhen the sender composes a message and clicks send, the mail client contacts the SMTP server of the sender's email service provider. That server checks whether the recipient's domain is the same as the sender's. If it is, it redirects the message internally. If it is not, the SMTP server queries a DNS server to find the IP address of the recipient's mail server, and the message is sent over the Internet to that server. In short, SMTP decides which path the message takes and moves it from server to server.\n\nPOP3 — Post Office Protocol version 3 — receiving\n\nOn arrival, the recipient's SMTP server passes the message to a mail delivery system, which places it in the recipient's mailbox. The recipient's email client then uses POP3 to retrieve the message from that mailbox and download it onto the local device so it can be read.\n\nThe difference in one line: SMTP is outgoing and moves mail between servers; POP3 is incoming and moves mail from the server to the user's device. IMAP is the alternative to POP3 — it also retrieves mail, but leaves it on the server so it can be read from several devices.",
    keyPoints: [
      "SMTP = outgoing, decides the path, moves mail server to server",
      "SMTP checks whether the recipient's domain matches; if not it queries DNS for the IP",
      "POP3 = incoming, downloads mail from the mailbox to the local device",
      "IMAP retrieves mail too, but leaves it on the server"
    ]
  },

  {
    id: "mid-c-open-firewall-types",
    chapter: 4,
    source: "midterm",
    sourceLabel: "Paper C · Q2",
    papers: ["paper-c"],
    type: "open",
    marks: 6,
    question: "Describe THREE (3) types of the firewall.",
    modelAnswer: "A firewall is a program, usually on an Internet gateway server, that protects the resources of one network from users on other networks. Firewalls can exist as dedicated hardware, as software on a machine, or as a managed service. The notes list eight filtering types; any three, described properly, will do.\n\n1. Packet filtering\nThe firewall examines individual packets of data and, according to the rules you have set up, decides which of them are allowed to flow through your network. It is the simplest and fastest kind, because it looks at each packet in isolation.\n\n2. Proxy\nA proxy firewall acts as the intermediary between the recipient and an external system. Requests go out through it and replies come back through it, so your own system's IP address is hidden from attack — an attacker sees the proxy, not you.\n\n3. Inspection\nThe firewall inspects each packet that flows through it and decides whether to drop it, judging the packet in the context of the connection rather than purely on its own.\n\nOther types you could substitute: IP addresses (blocking particular machines by their IP), domain names (blocking or allowing particular websites), protocol (deciding which services are permitted on each system), ports (restricting a service to specified port numbers) and keywords (sifting the data flowing through the network to block certain words).",
    keyPoints: [
      "Firewall = security buffer between a private network and external networks",
      "Can be dedicated hardware, software on a machine, or a managed service",
      "Packet filtering — allow or block individual packets by rule",
      "Proxy — acts as intermediary, hides your IP address",
      "Inspection — inspects each packet and decides whether to drop it",
      "Others: IP address, domain name, protocol, ports, keywords"
    ]
  },

  {
    id: "mid-c-open-wikipedia",
    chapter: 5,
    source: "midterm",
    sourceLabel: "Paper C · Q3",
    papers: ["paper-c"],
    type: "open",
    marks: 4,
    question: "Provide TWO (2) reasons that disprove Wikipedia as a reliable source.",
    modelAnswer: "1. The content is not necessarily written by subject experts, so it may simply be incorrect.\nAnyone can edit a Wikipedia article. There is no requirement that the author has any qualification in the subject, and no formal peer review of the kind a published academic article goes through. An article may therefore contain errors, omissions or bias without any of it being obvious to a reader.\n\n2. Articles can be changed or deleted between viewings, so the source is not stable.\nWhat you cite today may not say the same thing tomorrow, or may not exist at all. Academic work depends on a reader being able to go back to your source and find the same claim there, and Wikipedia cannot guarantee that.\n\nA third reason if more marks are on offer: anyone can find Google or Wikipedia, so relying on them shows no research skill. To develop academic skills you are expected to go beyond these basic tools.\n\nThe safe way to use Wikipedia, rather than not using it at all, is to scan the article to get general information and the right terminology, then scan it for its references and go and read those instead.",
    keyPoints: [
      "Not necessarily written by subject experts, so it may be incorrect",
      "Articles may be changed or deleted between viewings — unstable to cite",
      "Anyone can find it, so it shows no research skill",
      "Safe use: take the general terms and then follow the references"
    ]
  },

  {
    id: "mid-c-open-url",
    chapter: 1,
    source: "midterm",
    sourceLabel: "Paper C · Q6",
    papers: ["paper-c"],
    type: "open",
    marks: 8,
    question: "Define and describe in detail the URL, its parts and their functions.",
    modelAnswer: "Definition\n\nURL stands for Uniform Resource Locator. It is the unique address of every web page on the Internet — a standard way of expressing the location and data type of a resource. In general it takes the form protocol://address, where the protocol is something like HTTP, FTP or telnet, and the address is the server name of the given resource.\n\nThe parts and what each one does\n\nTake this example:\n\nhttps://www.example.edu:443/courses/bic1234/notes.html?topic=url#part3\n\n- Protocol (scheme) — https:// — states the set of rules the browser must use to fetch the resource. HTTP is the protocol for exchanging files on the Web; HTTPS is the encrypted form of it; FTP is used for transferring files.\n- Domain name (host) — www.example.edu — identifies the server the resource lives on. DNS translates this name into the IP address the request is actually routed to. Its last part is the domain category: .com for a commercial organisation, .edu for an educational one, .gov for a branch of the US government.\n- Port — :443 — the numbered channel on the server to connect to. It is almost always left out, because each protocol has a default (80 for HTTP, 443 for HTTPS).\n- Path — /courses/bic1234/notes.html — the location of the particular document within that server, written as a folder path ending in the file name.\n- Query string — ?topic=url — optional extra data passed to the server, written as name=value pairs after a question mark.\n- Fragment (anchor) — #part3 — points at a specific section inside the page. It is handled by the browser and never sent to the server.\n\nFor an eight-mark answer, define the URL first, then name the parts in order and give each one its function — the marks are usually spread across the parts.",
    keyPoints: [
      "URL = Uniform Resource Locator, the unique address of every web page",
      "General form: protocol://address",
      "Protocol — the rules used to fetch the resource (HTTP, HTTPS, FTP)",
      "Domain name — the server holding the resource, resolved by DNS to an IP address",
      "Port — the channel on the server; usually omitted because of defaults",
      "Path — the location of the document within the server",
      "Query string — optional name=value data passed to the server",
      "Fragment — a section within the page, handled by the browser"
    ]
  }

];
