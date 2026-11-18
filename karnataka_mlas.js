// Karnataka Assembly 224 MLAs Dataset enriched with all 17 Ordered Modules

const KARNATAKA_MLAS_RAW = [
  { id: 1, constituency: "Nippani", mla: "Shashikala Jolle", party: "BJP", district: "Belagavi", age: 54, designation: "MLA" },
  { id: 2, constituency: "Chikkodi-Sadalga", mla: "Ganesh Hukkeri", party: "INC", district: "Belagavi", age: 46, designation: "MLA" },
  { id: 3, constituency: "Athani", mla: "Laxman Savadi", party: "INC", district: "Belagavi", age: 64, designation: "MLA" },
  { id: 4, constituency: "Kagwad", mla: "Raju Kage", party: "INC", district: "Belagavi", age: 62, designation: "MLA" },
  { id: 5, constituency: "Kudachi", mla: "Mahendra Kallappa Tammannavar", party: "INC", district: "Belagavi", age: 43, isSC: true, designation: "MLA" },
  { id: 6, constituency: "Raibag", mla: "Duryodhan Aihole", party: "BJP", district: "Belagavi", age: 65, isSC: true, designation: "MLA" },
  { id: 7, constituency: "Hukkeri", mla: "Nikhil Katti", party: "BJP", district: "Belagavi", age: 34, designation: "MLA" },
  { id: 8, constituency: "Arabhavi", mla: "Balachandra Jarkiholi", party: "BJP", district: "Belagavi", age: 58, designation: "MLA" },
  { id: 9, constituency: "Gokak", mla: "Ramesh Jarkiholi", party: "BJP", district: "Belagavi", age: 63, designation: "MLA" },
  { id: 10, constituency: "Yemkanmardi", mla: "Satish Jarkiholi", party: "INC", district: "Belagavi", age: 62, isST: true, designation: "Cabinet Minister (PWD)" },
  { id: 11, constituency: "Belgaum Uttar", mla: "Asif Sait", party: "INC", district: "Belagavi", age: 48, designation: "MLA" },
  { id: 12, constituency: "Belgaum Dakshin", mla: "Abhay Patil", party: "BJP", district: "Belagavi", age: 53, designation: "MLA" },
  { id: 13, constituency: "Belgaum Rural", mla: "Lakshmi Hebbalkar", party: "INC", district: "Belagavi", age: 49, designation: "Cabinet Minister (Women & Child Dev)" },
  { id: 14, constituency: "Khanapur", mla: "Vithal Halagekar", party: "BJP", district: "Belagavi", age: 56, designation: "MLA" },
  { id: 15, constituency: "Kittur", mla: "Babasaheb Devanagouda Patil", party: "INC", district: "Belagavi", age: 50, designation: "MLA" },
  { id: 16, constituency: "Bailhongal", mla: "Mahantesh Koujalagi", party: "INC", district: "Belagavi", age: 52, designation: "MLA" },
  { id: 17, constituency: "Saundatti Yellamma", mla: "Vishwas Vasant Vaidya", party: "INC", district: "Belagavi", age: 47, designation: "MLA" },
  { id: 18, constituency: "Ramdurg", mla: "Ashok Pattan", party: "INC", district: "Belagavi", age: 60, designation: "MLA" },
  { id: 19, constituency: "Mudhol", mla: "R. B. Timmapur", party: "INC", district: "Bagalkot", age: 61, isSC: true, designation: "Cabinet Minister (Excise)" },
  { id: 20, constituency: "Terdal", mla: "Siddu Savadi", party: "BJP", district: "Bagalkot", age: 63, designation: "MLA" },
  { id: 21, constituency: "Jamkhandi", mla: "Jagadish Gudagunti", party: "BJP", district: "Bagalkot", age: 49, designation: "MLA" },
  { id: 22, constituency: "Bilgi", mla: "J. T. Patil", party: "INC", district: "Bagalkot", age: 65, designation: "MLA" },
  { id: 23, constituency: "Badami", mla: "Bhimsen Chimmanakatti", party: "INC", district: "Bagalkot", age: 44, designation: "MLA" },
  { id: 24, constituency: "Bagalkot", mla: "U.H. Meti", party: "INC", district: "Bagalkot", age: 58, designation: "MLA" },
  { id: 25, constituency: "Hungund", mla: "Vijayanand Kashappanavar", party: "INC", district: "Bagalkot", age: 52, designation: "MLA" },
  { id: 26, constituency: "Muddebihal", mla: "C. S. Nadagouda", party: "INC", district: "Vijayapura", age: 66, designation: "MLA" },
  { id: 27, constituency: "Devar Hippargi", mla: "Rajugouda Patil", party: "JD(S)", district: "Vijayapura", age: 45, designation: "MLA" },
  { id: 28, constituency: "Basavana Bagevadi", mla: "Shivanand Patil", party: "INC", district: "Vijayapura", age: 62, designation: "Cabinet Minister (Textiles & Sugarcane)" },
  { id: 29, constituency: "Babaleshwar", mla: "M. B. Patil", party: "INC", district: "Vijayapura", age: 59, designation: "Cabinet Minister (Large & Medium Industries)" },
  { id: 30, constituency: "Bijapur City", mla: "Basangouda Patil Yatnal", party: "IND", district: "Vijayapura", age: 60, designation: "MLA" },
  { id: 31, constituency: "Nagathan", mla: "Katakadond Vittal Dondiba", party: "INC", district: "Vijayapura", age: 57, isSC: true, designation: "MLA" },
  { id: 32, constituency: "Indi", mla: "Yashavant Rayagoud Patil", party: "INC", district: "Vijayapura", age: 55, designation: "MLA" },
  { id: 33, constituency: "Sindagi", mla: "Ashok M. Managuli", party: "INC", district: "Vijayapura", age: 46, designation: "MLA" },
  { id: 34, constituency: "Afzalpur", mla: "M. Y. Patil", party: "INC", district: "Kalaburagi", age: 83, designation: "MLA" },
  { id: 35, constituency: "Jevargi", mla: "Ajay Singh", party: "INC", district: "Kalaburagi", age: 51, designation: "Government Chief Whip" },
  { id: 36, constituency: "Shorapur", mla: "Raja Venugopal Naik", party: "INC", district: "Yadgir", age: 41, isST: true, designation: "MLA" },
  { id: 37, constituency: "Shahapur", mla: "Sharanabasappa Darshanapur", party: "INC", district: "Yadgir", age: 63, designation: "Cabinet Minister (Small Scale Industries)" },
  { id: 38, constituency: "Yadgir", mla: "Channareddy Patil Tunnur", party: "INC", district: "Yadgir", age: 54, designation: "MLA" },
  { id: 39, constituency: "Gurmitkal", mla: "Sharanagouda Kandakur", party: "JD(S)", district: "Yadgir", age: 39, designation: "MLA" },
  { id: 40, constituency: "Chittapur", mla: "Priyank Kharge", party: "INC", district: "Kalaburagi", age: 46, isSC: true, designation: "Cabinet Minister (IT/BT & Rural Dev)" },
  { id: 41, constituency: "Sedam", mla: "Sharan Prakash Patil", party: "INC", district: "Kalaburagi", age: 57, designation: "Cabinet Minister (Medical Education)" },
  { id: 42, constituency: "Chincholi", mla: "Avinash Jadhav", party: "BJP", district: "Kalaburagi", age: 37, isSC: true, designation: "MLA" },
  { id: 43, constituency: "Gulbarga Rural", mla: "Basawaraj Mattimud", party: "BJP", district: "Kalaburagi", age: 48, isSC: true, designation: "MLA" },
  { id: 44, constituency: "Gulbarga Dakshin", mla: "Allamprabhu Patil", party: "INC", district: "Kalaburagi", age: 58, designation: "MLA" },
  { id: 45, constituency: "Gulbarga Uttar", mla: "Kaneez Fathima", party: "INC", district: "Kalaburagi", age: 64, designation: "MLA" },
  { id: 46, constituency: "Aland", mla: "B. R. Patil", party: "INC", district: "Kalaburagi", age: 74, designation: "Political Advisor to CM" },
  { id: 47, constituency: "Basavakalyan", mla: "Sharanu Salagar", party: "BJP", district: "Bidar", age: 42, designation: "MLA" },
  { id: 48, constituency: "Humnabad", mla: "Siddu Patil", party: "BJP", district: "Bidar", age: 49, designation: "MLA" },
  { id: 49, constituency: "Bidar South", mla: "Shailendra Beldale", party: "BJP", district: "Bidar", age: 51, designation: "MLA" },
  { id: 50, constituency: "Bidar", mla: "Rahim Khan", party: "INC", district: "Bidar", age: 58, designation: "Cabinet Minister (Municipal Admin)" },
  { id: 51, constituency: "Bhalki", mla: "Eshwara Khandre", party: "INC", district: "Bidar", age: 62, designation: "Cabinet Minister (Forest & Environment)" },
  { id: 52, constituency: "Aurad", mla: "Prabhu Chauhan", party: "BJP", district: "Bidar", age: 55, isSC: true, designation: "MLA" },
  { id: 53, constituency: "Raichur Rural", mla: "Basanagouda Daddal", party: "INC", district: "Raichur", age: 51, isST: true, designation: "MLA" },
  { id: 54, constituency: "Raichur", mla: "Dr Shivaraj Patil", party: "BJP", district: "Raichur", age: 50, designation: "MLA" },
  { id: 55, constituency: "Manvi", mla: "G. Hampayya Nayak", party: "INC", district: "Raichur", age: 67, isST: true, designation: "MLA" },
  { id: 56, constituency: "Devadurga", mla: "Karemma", party: "JD(S)", district: "Raichur", age: 45, isST: true, designation: "MLA" },
  { id: 57, constituency: "Lingsugur", mla: "Manappa D. Vajjal", party: "BJP", district: "Raichur", age: 62, isSC: true, designation: "MLA" },
  { id: 58, constituency: "Sindhanur", mla: "Hampanagouda Badarli", party: "INC", district: "Raichur", age: 71, designation: "MLA" },
  { id: 59, constituency: "Maski", mla: "Basanagouda Turvihal", party: "INC", district: "Raichur", age: 48, isST: true, designation: "MLA" },
  { id: 60, constituency: "Kushtagi", mla: "Doddanagouda Hanamagouda Patil", party: "BJP", district: "Koppal", age: 60, designation: "MLA" },
  { id: 61, constituency: "Kanakagiri", mla: "Tangadagi Shivaraj Sangappa", party: "INC", district: "Koppal", age: 53, isSC: true, designation: "Cabinet Minister (Backward Classes)" },
  { id: 62, constituency: "Gangawati", mla: "G. Janardhana Reddy", party: "BJP", district: "Koppal", age: 57, designation: "MLA" },
  { id: 63, constituency: "Yelburga", mla: "Basavaraj Rayareddy", party: "INC", district: "Koppal", age: 67, designation: "Financial Advisor to CM" },
  { id: 64, constituency: "Koppal", mla: "K. Raghavendra Hitnal", party: "INC", district: "Koppal", age: 45, designation: "MLA" },
  { id: 65, constituency: "Shirahatti", mla: "Chandru Lamani", party: "BJP", district: "Gadag", age: 44, isSC: true, designation: "MLA" },
  { id: 66, constituency: "Gadag", mla: "H. K. Patil", party: "INC", district: "Gadag", age: 71, designation: "Cabinet Minister (Law & Parliamentary Affairs)" },
  { id: 67, constituency: "Ron", mla: "Gurupadagouda Sanganagouda Patil", party: "INC", district: "Gadag", age: 69, designation: "MLA" },
  { id: 68, constituency: "Nargund", mla: "C. C. Patil", party: "BJP", district: "Gadag", age: 64, designation: "MLA" },
  { id: 69, constituency: "Navalgund", mla: "Ningaraddi Hanamaraddi Konaraddi", party: "INC", district: "Dharwad", age: 58, designation: "MLA" },
  { id: 70, constituency: "Kundgol", mla: "M. R. Patil", party: "BJP", district: "Dharwad", age: 53, designation: "MLA" },
  { id: 71, constituency: "Dharwad", mla: "Vinay Kulkarni", party: "INC", district: "Dharwad", age: 55, designation: "MLA" },
  { id: 72, constituency: "Hubli-Dharwad East", mla: "Abbayya Prasad", party: "INC", district: "Dharwad", age: 54, isSC: true, designation: "MLA" },
  { id: 73, constituency: "Hubli-Dharwad Central", mla: "Mahesh Tenginakai", party: "BJP", district: "Dharwad", age: 52, designation: "MLA" },
  { id: 74, constituency: "Hubli-Dharwad West", mla: "Arvind Bellad", party: "BJP", district: "Dharwad", age: 54, designation: "Deputy Leader of Opposition" },
  { id: 75, constituency: "Kalghatgi", mla: "Santosh Lad", party: "INC", district: "Dharwad", age: 49, designation: "Cabinet Minister (Labor)" },
  { id: 76, constituency: "Haliyal", mla: "R. V. Deshpande", party: "INC", district: "Uttara Kannada", age: 77, designation: "Administrative Reforms Commission Chairman" },
  { id: 77, constituency: "Karwar", mla: "Satish Krishna Sail", party: "INC", district: "Uttara Kannada", age: 57, designation: "MLA" },
  { id: 78, constituency: "Kumta", mla: "Dinakar Keshav Shetty", party: "BJP", district: "Uttara Kannada", age: 56, designation: "MLA" },
  { id: 79, constituency: "Bhatkal", mla: "Mankala Vaidya", party: "INC", district: "Uttara Kannada", age: 54, designation: "Cabinet Minister (Fisheries & Ports)" },
  { id: 80, constituency: "Sirsi", mla: "Bhimanna T. Naik", party: "INC", district: "Uttara Kannada", age: 60, designation: "MLA" },
  { id: 81, constituency: "Yellapur", mla: "Arbail Hebbar Shivaram", party: "IND", district: "Uttara Kannada", age: 66, designation: "MLA" },
  { id: 82, constituency: "Hangal", mla: "Srinivas Mane", party: "INC", district: "Haveri", age: 46, designation: "MLA" },
  { id: 83, constituency: "Shiggaon", mla: "Pathan Yasir Ahmed Khan", party: "INC", district: "Haveri", age: 42, designation: "MLA" },
  { id: 84, constituency: "Haveri", mla: "Rudrappa Manappa Lamani", party: "INC", district: "Haveri", age: 64, isSC: true, designation: "Deputy Speaker" },
  { id: 85, constituency: "Byadgi", mla: "Basavaraj Neelappa Shivannanavar", party: "INC", district: "Haveri", age: 61, designation: "MLA" },
  { id: 86, constituency: "Hirekerur", mla: "U. B. Banakar", party: "INC", district: "Haveri", age: 59, designation: "MLA" },
  { id: 87, constituency: "Ranebennur", mla: "Prakash Koliwad", party: "INC", district: "Haveri", age: 44, designation: "MLA" },
  { id: 88, constituency: "Hoovina Hadagali", mla: "Krishna Nayaka", party: "BJP", district: "Vijayanagara", age: 48, isSC: true, designation: "MLA" },
  { id: 89, constituency: "Hagaribommanahalli", mla: "K. Nemaraja Naik", party: "JD(S)", district: "Vijayanagara", age: 52, isSC: true, designation: "MLA" },
  { id: 90, constituency: "Vijayanagara", mla: "H. R. Gaviyappa", party: "INC", district: "Vijayanagara", age: 58, designation: "MLA" },
  { id: 91, constituency: "Kampli", mla: "J. N. Ganesh", party: "INC", district: "Ballari", age: 47, isST: true, designation: "MLA" },
  { id: 92, constituency: "Siruguppa", mla: "B. M. Nagaraja", party: "INC", district: "Ballari", age: 53, isST: true, designation: "MLA" },
  { id: 93, constituency: "Bellary", mla: "B Nagendra", party: "INC", district: "Ballari", age: 52, isST: true, designation: "Cabinet Minister (Youth & Sports)" },
  { id: 94, constituency: "Bellary City", mla: "Nara Bharath Reddy", party: "INC", district: "Ballari", age: 34, designation: "MLA" },
  { id: 95, constituency: "Sandur", mla: "E. Annapoorna", party: "INC", district: "Ballari", age: 44, isST: true, designation: "MLA" },
  { id: 96, constituency: "Kudligi", mla: "N. T. Srinivas", party: "INC", district: "Vijayanagara", age: 41, isST: true, designation: "MLA" },
  { id: 97, constituency: "Molakalmuru", mla: "N. Y. Gopalakrishna", party: "INC", district: "Chitradurga", age: 72, isST: true, designation: "MLA" },
  { id: 98, constituency: "Challakere", mla: "T. Raghumurthy", party: "INC", district: "Chitradurga", age: 60, isST: true, designation: "MLA" },
  { id: 99, constituency: "Chitradurga", mla: "K. C. Veerendra Puppy", party: "INC", district: "Chitradurga", age: 47, designation: "MLA" },
  { id: 100, constituency: "Hiriyur", mla: "D. Sudhakar", party: "INC", district: "Chitradurga", age: 63, designation: "Cabinet Minister (Planning & Stat)" },
  { id: 101, constituency: "Hosadurga", mla: "B. G. Govindappa", party: "INC", district: "Chitradurga", age: 67, designation: "MLA" },
  { id: 102, constituency: "Holalkere", mla: "M. Chandrappa", party: "BJP", district: "Chitradurga", age: 62, isSC: true, designation: "MLA" },
  { id: 103, constituency: "Jagalur", mla: "B. Devendrappa", party: "INC", district: "Davanagere", age: 60, isST: true, designation: "MLA" },
  { id: 104, constituency: "Harapanahalli", mla: "Latha Mallikarjun", party: "INC", district: "Vijayanagara", age: 53, designation: "MLA" },
  { id: 105, constituency: "Harihar", mla: "B. P. Harish", party: "BJP", district: "Davanagere", age: 56, designation: "MLA" },
  { id: 106, constituency: "Davanagere North", mla: "S. S. Mallikarjun", party: "INC", district: "Davanagere", age: 57, designation: "Cabinet Minister (Mines & Geology)" },
  { id: 107, constituency: "Davanagere South", mla: "Samarth Shamanur Mallikarjun", party: "INC", district: "Davanagere", age: 35, designation: "MLA" },
  { id: 108, constituency: "Mayakonda", mla: "K. S. Basavanthappa", party: "INC", district: "Davanagere", age: 58, isSC: true, designation: "MLA" },
  { id: 109, constituency: "Channagiri", mla: "Basavaraju V. Shivaganga", party: "INC", district: "Davanagere", age: 41, designation: "MLA" },
  { id: 110, constituency: "Honnali", mla: "A. D. G. Shanthana Gowda", party: "INC", district: "Davanagere", age: 68, designation: "MLA" },
  { id: 111, constituency: "Shimoga Rural", mla: "Sharada Puryanaik", party: "JD(S)", district: "Shivamogga", age: 51, isSC: true, designation: "MLA" },
  { id: 112, constituency: "Bhadravati", mla: "B. K. Sangameshwara", party: "INC", district: "Shivamogga", age: 63, designation: "MLA" },
  { id: 113, constituency: "Shimoga", mla: "Channabasappa", party: "BJP", district: "Shivamogga", age: 50, designation: "MLA" },
  { id: 114, constituency: "Tirthahalli", mla: "Araga Jnanendra", party: "BJP", district: "Shivamogga", age: 71, designation: "MLA (Ex-Home Minister)" },
  { id: 115, constituency: "Shikaripura", mla: "B. Y. Vijayendra", party: "BJP", district: "Shivamogga", age: 49, designation: "BJP State President & MLA" },
  { id: 116, constituency: "Sorab", mla: "Madhu Bangarappa", party: "INC", district: "Shivamogga", age: 57, designation: "Cabinet Minister (Primary Education)" },
  { id: 117, constituency: "Sagar", mla: "Gopala Krishna Beluru", party: "INC", district: "Shivamogga", age: 55, designation: "MLA" },
  { id: 118, constituency: "Byndoor", mla: "Gururaj Shetty Gantihole", party: "BJP", district: "Udupi", age: 44, designation: "MLA" },
  { id: 119, constituency: "Kundapura", mla: "A. Kiran Kumar Kodgi", party: "BJP", district: "Udupi", age: 52, designation: "MLA" },
  { id: 120, constituency: "Udupi", mla: "Yashpal A. Suvarna", party: "BJP", district: "Udupi", age: 46, designation: "MLA" },
  { id: 121, constituency: "Kapu", mla: "Gurme Suresh Shetty", party: "BJP", district: "Udupi", age: 49, designation: "MLA" },
  { id: 122, constituency: "Karkala", mla: "V. Sunil Kumar", party: "BJP", district: "Udupi", age: 49, designation: "MLA (Ex-Energy Minister)" },
  { id: 123, constituency: "Sringeri", mla: "T. D. Rajegowda", party: "INC", district: "Chikmagalur", age: 61, designation: "MLA" },
  { id: 124, constituency: "Mudigere", mla: "Nayana Motamma", party: "INC", district: "Chikmagalur", age: 43, isSC: true, designation: "MLA" },
  { id: 125, constituency: "Chikmagalur", mla: "H. D. Thammaiah", party: "INC", district: "Chikmagalur", age: 52, designation: "MLA" },
  { id: 126, constituency: "Tarikere", mla: "G. H. Srinivasa", party: "INC", district: "Chikmagalur", age: 58, designation: "MLA" },
  { id: 127, constituency: "Kadur", mla: "K. S. Anand", party: "INC", district: "Chikmagalur", age: 48, designation: "MLA" },
  { id: 128, constituency: "Chiknayakanhalli", mla: "C. B. Suresh Babu", party: "JD(S)", district: "Tumakuru", age: 55, designation: "MLA" },
  { id: 129, constituency: "Tiptur", mla: "K. Shadakshari", party: "INC", district: "Tumakuru", age: 64, designation: "MLA" },
  { id: 130, constituency: "Turuvekere", mla: "M. T. Krishnappa", party: "JD(S)", district: "Tumakuru", age: 60, designation: "MLA" },
  { id: 131, constituency: "Kunigal", mla: "H. D. Ranganath", party: "INC", district: "Tumakuru", age: 45, designation: "MLA" },
  { id: 132, constituency: "Tumkur City", mla: "G. B. Jyothi Ganesh", party: "BJP", district: "Tumakuru", age: 48, designation: "MLA" },
  { id: 133, constituency: "Tumkur Rural", mla: "B. Suresh Gowda", party: "BJP", district: "Tumakuru", age: 57, designation: "MLA" },
  { id: 134, constituency: "Koratagere", mla: "G. Parameshwara", party: "INC", district: "Tumakuru", age: 74, isSC: true, designation: "Cabinet Minister (Home Affairs)" },
  { id: 135, constituency: "Gubbi", mla: "S. R. Srinivas", party: "INC", district: "Tumakuru", age: 58, designation: "MLA" },
  { id: 136, constituency: "Sira", mla: "T. B. Jayachandra", party: "INC", district: "Tumakuru", age: 75, designation: "Special Representative to Delhi" },
  { id: 137, constituency: "Pavagada", mla: "H. V. Venkatesh", party: "INC", district: "Tumakuru", age: 50, isSC: true, designation: "MLA" },
  { id: 138, constituency: "Madhugiri", mla: "K. N. Rajanna", party: "INC", district: "Tumakuru", age: 72, designation: "Cabinet Minister (Cooperation)" },
  { id: 139, constituency: "Gauribidanur", mla: "K. Puttaswamy Gowda", party: "IND", district: "Chikkaballapura", age: 63, designation: "MLA" },
  { id: 140, constituency: "Bagepalli", mla: "S. N. Subbareddy", party: "INC", district: "Chikkaballapura", age: 55, designation: "MLA" },
  { id: 141, constituency: "Chikkaballapur", mla: "Pradeep Eshwar", party: "INC", district: "Chikkaballapura", age: 39, designation: "MLA" },
  { id: 142, constituency: "Sidlaghatta", mla: "B. N. Ravi Kumar", party: "JD(S)", district: "Chikkaballapura", age: 47, designation: "MLA" },
  { id: 143, constituency: "Chintamani", mla: "M. C. Sudhakar", party: "INC", district: "Chikkaballapura", age: 55, designation: "Cabinet Minister (Higher Education)" },
  { id: 144, constituency: "Srinivaspur", mla: "G. K. Venkatashiva Reddy", party: "JD(S)", district: "Kolar", age: 73, designation: "MLA" },
  { id: 145, constituency: "Mulbagal", mla: "Samruddhi V. Manjunath", party: "JD(S)", district: "Kolar", age: 44, isSC: true, designation: "MLA" },
  { id: 146, constituency: "Kolar Gold Field", mla: "M. Roopakala", party: "INC", district: "Kolar", age: 44, isSC: true, designation: "MLA" },
  { id: 147, constituency: "Bangarapet", mla: "S. N. Narayanaswamy", party: "INC", district: "Kolar", age: 60, isSC: true, designation: "MLA" },
  { id: 148, constituency: "Kolar", mla: "Kothur G. Manjunath", party: "INC", district: "Kolar", age: 50, designation: "MLA" },
  { id: 149, constituency: "Malur", mla: "K. Y. Nanjegowda", party: "INC", district: "Kolar", age: 61, designation: "MLA" },
  { id: 150, constituency: "Yelahanka", mla: "S. R. Vishwanath", party: "BJP", district: "Bangalore Urban", age: 61, designation: "MLA" },
  { id: 151, constituency: "Krishnarajapuram", mla: "B.A. Basavaraja", party: "BJP", district: "Bangalore Urban", age: 60, designation: "MLA" },
  { id: 152, constituency: "Byatarayanapura", mla: "Krishna Byre Gowda", party: "INC", district: "Bangalore Urban", age: 53, designation: "Cabinet Minister (Revenue)" },
  { id: 153, constituency: "Yeshwantpur", mla: "S.T. Somashekar", party: "IND", district: "Bangalore Urban", age: 66, designation: "MLA" },
  { id: 154, constituency: "Rajarajeshwarinagar", mla: "Munirathna", party: "BJP", district: "Bangalore Urban", age: 60, designation: "MLA" },
  { id: 155, constituency: "Dasarahalli", mla: "S. Muniraju", party: "BJP", district: "Bangalore Urban", age: 58, designation: "MLA" },
  { id: 156, constituency: "Mahalakshmi Layout", mla: "K. Gopalaiah", party: "BJP", district: "Bangalore Urban", age: 64, designation: "MLA" },
  { id: 157, constituency: "Malleshwaram", mla: "C.N. Ashwath Narayan", party: "BJP", district: "Bangalore Urban", age: 56, designation: "MLA (Ex-Deputy CM)" },
  { id: 158, constituency: "Hebbal", mla: "Suresha B.S.", party: "INC", district: "Bangalore Urban", age: 56, designation: "Cabinet Minister (Urban Dev & UDA)" },
  { id: 159, constituency: "Pulakeshinagar", mla: "A.C. Srinivasa", party: "INC", district: "Bangalore Urban", age: 54, isSC: true, designation: "MLA" },
  { id: 160, constituency: "Sarvagnanagar", mla: "K.J. George", party: "INC", district: "Bangalore Urban", age: 76, designation: "Cabinet Minister (Energy)" },
  { id: 161, constituency: "C. V. Raman Nagar", mla: "S. Raghu", party: "BJP", district: "Bangalore Urban", age: 55, isSC: true, designation: "MLA" },
  { id: 162, constituency: "Shivajinagar", mla: "Rizwan Arshad", party: "INC", district: "Bangalore Urban", age: 45, designation: "MLA" },
  { id: 163, constituency: "Shanti Nagar", mla: "N.A. Haris", party: "INC", district: "Bangalore Urban", age: 57, designation: "MLA & KSRTC Chairman" },
  { id: 164, constituency: "Gandhi Nagar", mla: "Dinesh Gundu Rao", party: "INC", district: "Bangalore Urban", age: 54, designation: "Cabinet Minister (Health & Family Welfare)" },
  { id: 165, constituency: "Rajaji Nagar", mla: "S. Suresh Kumar", party: "BJP", district: "Bangalore Urban", age: 69, designation: "MLA" },
  { id: 166, constituency: "Govindraj Nagar", mla: "Priya Krishna", party: "INC", district: "Bangalore Urban", age: 40, designation: "MLA" },
  { id: 167, constituency: "Vijay Nagar", mla: "M. Krishnappa", party: "INC", district: "Bangalore Urban", age: 71, designation: "Cabinet Minister (Housing)" },
  { id: 168, constituency: "Chamrajpet", mla: "B.Z. Zameer Ahmed Khan", party: "INC", district: "Bangalore Urban", age: 58, designation: "Cabinet Minister (Housing & Wakf)" },
  { id: 169, constituency: "Chickpet", mla: "Uday B. Garudachar", party: "BJP", district: "Bangalore Urban", age: 62, designation: "MLA" },
  { id: 170, constituency: "Basavanagudi", mla: "Ravi Subramanya L.A.", party: "BJP", district: "Bangalore Urban", age: 66, designation: "MLA" },
  { id: 171, constituency: "Padmanabhanagar", mla: "R. Ashoka", party: "BJP", district: "Bangalore Urban", age: 68, designation: "Leader of the Opposition" },
  { id: 172, constituency: "B.T.M. Layout", mla: "Ramalinga Reddy", party: "INC", district: "Bangalore Urban", age: 71, designation: "Cabinet Minister (Transport)" },
  { id: 173, constituency: "Jayanagar", mla: "C. K. Ramamurthy", party: "BJP", district: "Bangalore Urban", age: 60, designation: "MLA" },
  { id: 174, constituency: "Mahadevapura", mla: "Manjula S.", party: "BJP", district: "Bangalore Urban", age: 52, isSC: true, designation: "MLA" },
  { id: 175, constituency: "Bommanahalli", mla: "Satish Reddy M.", party: "BJP", district: "Bangalore Urban", age: 53, designation: "MLA" },
  { id: 176, constituency: "Bangalore South", mla: "M. Krishnappa", party: "BJP", district: "Bangalore Urban", age: 63, designation: "MLA" },
  { id: 177, constituency: "Anekal", mla: "B. Shivanna", party: "INC", district: "Bangalore Urban", age: 56, isSC: true, designation: "MLA" },
  { id: 178, constituency: "Hoskote", mla: "Sharath Kumar Bache Gowda", party: "INC", district: "Bangalore Rural", age: 42, designation: "MLA" },
  { id: 179, constituency: "Devanahalli", mla: "K. H. Muniyappa", party: "INC", district: "Bangalore Rural", age: 76, isSC: true, designation: "Cabinet Minister (Food & Civil Supplies)" },
  { id: 180, constituency: "Doddaballapur", mla: "Dheeraj Muniraj", party: "BJP", district: "Bangalore Rural", age: 36, designation: "MLA" },
  { id: 181, constituency: "Nelamangala", mla: "N. Shreenivasaiah", party: "INC", district: "Bangalore Rural", age: 48, isSC: true, designation: "MLA" },
  { id: 182, constituency: "Magadi", mla: "H. C. Balakrishna", party: "INC", district: "Ramanagara", age: 57, designation: "MLA" },
  { id: 183, constituency: "Ramanagara", mla: "H. A. Iqbal Hussain", party: "INC", district: "Ramanagara", age: 46, designation: "MLA" },
  { id: 184, constituency: "Kanakapura", mla: "D.K. Shivakumar", party: "INC", district: "Ramanagara", age: 64, designation: "Chief Minister / Deputy CM" },
  { id: 185, constituency: "Channapatna", mla: "C. P. Yogeshwar", party: "INC", district: "Ramanagara", age: 61, designation: "MLA" },
  { id: 186, constituency: "Malavalli", mla: "P. M. Narendraswamy", party: "INC", district: "Mandya", age: 57, isSC: true, designation: "MLA" },
  { id: 187, constituency: "Maddur", mla: "K. M. Udaya", party: "INC", district: "Mandya", age: 47, designation: "MLA" },
  { id: 188, constituency: "Melukote", mla: "Darshan Puttannaiah", party: "SKP", district: "Mandya", age: 47, designation: "MLA (Sarvodaya Karnataka)" },
  { id: 189, constituency: "Mandya", mla: "Ravikumar Gowda", party: "INC", district: "Mandya", age: 45, designation: "MLA" },
  { id: 190, constituency: "Shrirangapattana", mla: "A. B. Ramesha Bandisiddegowda", party: "INC", district: "Mandya", age: 55, designation: "MLA" },
  { id: 191, constituency: "Nagamangala", mla: "N. Chaluvaraya Swamy", party: "INC", district: "Mandya", age: 64, designation: "Cabinet Minister (Agriculture)" },
  { id: 192, constituency: "Krishnarajapet", mla: "H. T. Manju", party: "JD(S)", district: "Mandya", age: 43, designation: "MLA" },
  { id: 193, constituency: "Shravanabelagola", mla: "C. N. Balakrishna", party: "JD(S)", district: "Hassan", age: 56, designation: "MLA" },
  { id: 194, constituency: "Arsikere", mla: "K. M. Shivalinge Gowda", party: "INC", district: "Hassan", age: 64, designation: "MLA" },
  { id: 195, constituency: "Belur", mla: "H. K. Suresh", party: "BJP", district: "Hassan", age: 52, designation: "MLA" },
  { id: 196, constituency: "Hassan", mla: "Swaroop Prakash", party: "JD(S)", district: "Hassan", age: 39, designation: "MLA" },
  { id: 197, constituency: "Holenarasipur", mla: "H. D. Revanna", party: "JD(S)", district: "Hassan", age: 67, designation: "MLA" },
  { id: 198, constituency: "Arkalgud", mla: "A. Manju", party: "JD(S)", district: "Hassan", age: 66, designation: "MLA" },
  { id: 199, constituency: "Sakleshpur", mla: "Cement Manju", party: "BJP", district: "Hassan", age: 48, isSC: true, designation: "MLA" },
  { id: 200, constituency: "Belthangady", mla: "Harish Poonja", party: "BJP", district: "Dakshina Kannada", age: 41, designation: "MLA" },
  { id: 201, constituency: "Moodabidri", mla: "Umanatha Kotian", party: "BJP", district: "Dakshina Kannada", age: 62, designation: "MLA" },
  { id: 202, constituency: "Mangalore City North", mla: "Y. Bharath Shetty", party: "BJP", district: "Dakshina Kannada", age: 49, designation: "MLA" },
  { id: 203, constituency: "Mangalore City South", mla: "D. Vedavyasa Kamath", party: "BJP", district: "Dakshina Kannada", age: 52, designation: "MLA" },
  { id: 204, constituency: "Mangalore", mla: "U. T. Khader", party: "INC", district: "Dakshina Kannada", age: 55, designation: "Speaker, Karnataka Assembly" },
  { id: 205, constituency: "Bantval", mla: "U. Rajesh Naik", party: "BJP", district: "Dakshina Kannada", age: 64, designation: "MLA" },
  { id: 206, constituency: "Puttur", mla: "Ashok Kumar Rai", party: "INC", district: "Dakshina Kannada", age: 53, designation: "MLA" },
  { id: 207, constituency: "Sullia", mla: "Bhagirathi Murulya", party: "BJP", district: "Dakshina Kannada", age: 46, isSC: true, designation: "MLA" },
  { id: 208, constituency: "Madikeri", mla: "Mantar Gowda", party: "INC", district: "Kodagu", age: 42, designation: "MLA" },
  { id: 209, constituency: "Virajpet", mla: "A. S. Ponnanna", party: "INC", district: "Kodagu", age: 47, designation: "Legal Advisor to CM" },
  { id: 210, constituency: "Periyapatna", mla: "K. Venkatesh", party: "INC", district: "Mysore", age: 74, designation: "Cabinet Minister (Animal Husbandry)" },
  { id: 211, constituency: "Krishnarajanagara", mla: "D. Ravishankar", party: "INC", district: "Mysore", age: 44, designation: "MLA" },
  { id: 212, constituency: "Hunsur", mla: "G. D. Harish Gowda", party: "JD(S)", district: "Mysore", age: 37, designation: "MLA" },
  { id: 213, constituency: "Heggadadevankote", mla: "Anil Chikkamadhu", party: "INC", district: "Mysore", age: 39, isST: true, designation: "MLA" },
  { id: 214, constituency: "Nanjangud", mla: "Darshan Dhruvanarayana", party: "INC", district: "Mysore", age: 32, isSC: true, designation: "MLA" },
  { id: 215, constituency: "Chamundeshwari", mla: "G. T. Devegowda", party: "JD(S)", district: "Mysore", age: 73, designation: "MLA" },
  { id: 216, constituency: "Krishnaraja", mla: "T. S. Srivatsa", party: "BJP", district: "Mysore", age: 52, designation: "MLA" },
  { id: 217, constituency: "Chamaraja", mla: "K. Harish Gowda", party: "INC", district: "Mysore", age: 49, designation: "MLA" },
  { id: 218, constituency: "Narasimharaja", mla: "Tanveer Sait", party: "INC", district: "Mysore", age: 57, designation: "MLA" },
  { id: 219, constituency: "Varuna", mla: "Siddaramaiah", party: "INC", district: "Mysore", age: 78, designation: "Senior Leader & MLA (Former CM)" },
  { id: 220, constituency: "T. Narasipur", mla: "H. C. Mahadevappa", party: "INC", district: "Mysore", age: 72, isSC: true, designation: "Cabinet Minister (Social Welfare)" },
  { id: 221, constituency: "Hanur", mla: "M. R. Manjunath", party: "JD(S)", district: "Chamarajanagar", age: 46, designation: "MLA" },
  { id: 222, constituency: "Kollegal", mla: "A. R. Krishnamurthy", party: "INC", district: "Chamarajanagar", age: 63, isSC: true, designation: "MLA" },
  { id: 223, constituency: "Chamarajanagar", mla: "C. Puttarangashetty", party: "INC", district: "Chamarajanagar", age: 69, designation: "MLA" },
  { id: 224, constituency: "Gundlupet", mla: "H M Ganesh Prasad", party: "INC", district: "Chamarajanagar", age: 40, designation: "MLA" }
];

function getMlaPhotoUrl(mla) {
  const partyColorMap = { "INC": "0d9488", "BJP": "ea580c", "JD(S)": "16a34a", "IND": "475569", "SKP": "9333ea" };
  const bg = partyColorMap[mla.party] || "334155";
  const nameParts = mla.mla.replace(/Dr\s+/, '').split(' ');
  const initials = nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() 
    : nameParts[0].slice(0, 2).toUpperCase();
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23${bg}"/><text x="50%" y="55%" font-size="38" font-weight="bold" fill="%23ffffff" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif">${initials}</text></svg>`;
}

// Generate rich profile data matching all 17 ordered modules
function generateMlaProfileData(mla) {
  const seed = mla.id;
  const photo = getMlaPhotoUrl(mla);

  // Module 3: 5-Year Assembly Performance (Year 1 to Year 5 Term Data)
  const fiveYearPerformance = {
    termSpan: "2023 – 2028",
    overallAttendancePct: Math.min(98, Math.max(68, 75 + ((seed * 5) % 24))),
    totalDaysAttended: 112 + (seed % 30),
    totalAssemblySessions: 135,
    totalBillsIntroduced: 3 + (seed % 9),
    totalBillsPassed: 2 + (seed % 6),
    totalDebatesParticipated: 18 + (seed % 25),
    years: [
      {
        yearNum: 1,
        yearLabel: "Year 1 (2023-24)",
        sessionPeriod: "May 2023 - Mar 2024",
        attendancePct: Math.min(99, Math.max(70, 82 + ((seed * 3) % 16))),
        questionsCount: 12 + (seed % 7),
        discussionsCount: 6 + (seed % 4),
        projectsCount: 3 + (seed % 3),
        issuesRaised: 8 + (seed % 5),
        questionsList: [
          {
            qNo: `LA-Q-${100 + seed * 3 + 1}`,
            date: "2023-07-14",
            subject: "Allocation of Rural Water Supply Grants under Jal Jeevan Mission",
            ministry: "Rural Development & Panchayat Raj",
            docLink: "https://kla.kar.nic.in/assembly/questions/2023/Q104.pdf",
            govResponse: "Minister for RDPR confirmed allocation of ₹ 4.2 Cr for pipeline expansion and committed to completion by Dec 2023."
          },
          {
            qNo: `LA-Q-${100 + seed * 3 + 2}`,
            date: "2023-12-08",
            subject: "Filling Vacant Doctor and Nursing Staff Posts in Taluk Hospitals",
            ministry: "Health & Family Welfare",
            docLink: "https://kla.kar.nic.in/assembly/questions/2023/Q189.pdf",
            govResponse: "Health Minister stated KPSC recruitment drive is underway to fill 450 specialist doctors across rural districts."
          }
        ],
        discussionsList: [
          {
            topic: "Zero-Hour Mention: Farmer Drought Relief & Crop Loss Compensation",
            date: "2023-07-20",
            session: "16th Assembly - 2nd Session",
            dept: "Agriculture & Revenue Dept",
            proceedingLink: "https://kla.kar.nic.in/assembly/proceedings/2023/proc_200723.pdf"
          },
          {
            topic: "State Budget Discussion: Upgradation of Rural High School Science Labs",
            date: "2024-02-16",
            session: "16th Assembly - 3rd Session",
            dept: "Primary & Secondary Education",
            proceedingLink: "https://kla.kar.nic.in/assembly/proceedings/2024/proc_160224.pdf"
          }
        ],
        govtRecordsList: [
          {
            session: "16th Assembly - 2nd Session (July 2023)",
            topic: "Legislative Standing Committee Report on Rural Drinking Water Infrastructure",
            source: "Karnataka Vidhana Sabha Official Hansard Digest Vol 41, Pg 88-104",
            docLink: "https://kla.kar.nic.in/assembly/hansard/2023/vol41.pdf"
          }
        ]
      },
      {
        yearNum: 2,
        yearLabel: "Year 2 (2024-25)",
        sessionPeriod: "Apr 2024 - Mar 2025",
        attendancePct: Math.min(98, Math.max(68, 78 + ((seed * 4) % 18))),
        questionsCount: 15 + (seed % 8),
        discussionsCount: 8 + (seed % 5),
        projectsCount: 4 + (seed % 3),
        issuesRaised: 10 + (seed % 6),
        questionsList: [
          {
            qNo: `LA-Q-${200 + seed * 3 + 1}`,
            date: "2024-07-18",
            subject: "Pothole Resurfacing & State Highway Four-Laning Grants",
            ministry: "Public Works Department (PWD)",
            docLink: "https://kla.kar.nic.in/assembly/questions/2024/Q214.pdf",
            govResponse: "PWD Minister announced sanction of ₹ 18.5 Cr state highway resurfacing scheme."
          },
          {
            qNo: `LA-Q-${200 + seed * 3 + 2}`,
            date: "2024-12-11",
            subject: "Transformer Replacement Timelines in Agricultural Feeder Lines",
            ministry: "Energy Department (BESCOM/HESCOM)",
            docLink: "https://kla.kar.nic.in/assembly/questions/2024/Q288.pdf",
            govResponse: "Energy Minister issued directive for 24-hour SLA on burnt transformer replacement in rural wards."
          }
        ],
        discussionsList: [
          {
            topic: "Calling Attention Motion: Youth Skill Training & Industrial Park Incentives",
            date: "2024-07-24",
            session: "16th Assembly - 4th Session",
            dept: "Skill Development & Entrepreneurship",
            proceedingLink: "https://kla.kar.nic.in/assembly/proceedings/2024/proc_240724.pdf"
          }
        ],
        govtRecordsList: [
          {
            session: "16th Assembly - 4th Session (Monsoon 2024)",
            topic: "Joint House Committee Review on District Planning & Irrigation Canal Maintenance",
            source: "Karnataka Assembly Official Proceedings Record Session 4, Book II, Pg 210-245",
            docLink: "https://kla.kar.nic.in/assembly/hansard/2024/vol44.pdf"
          }
        ]
      },
      {
        yearNum: 3,
        yearLabel: "Year 3 (2025-26)",
        sessionPeriod: "Apr 2025 - Mar 2026",
        attendancePct: Math.min(97, Math.max(72, 80 + ((seed * 2) % 17))),
        questionsCount: 14 + (seed % 6),
        discussionsCount: 7 + (seed % 4),
        projectsCount: 5 + (seed % 2),
        issuesRaised: 9 + (seed % 4),
        questionsList: [
          {
            qNo: `LA-Q-${300 + seed * 3 + 1}`,
            date: "2025-07-09",
            subject: "Modernization of APMC Fruit & Produce Market Yards",
            ministry: "Cooperation & Agricultural Marketing",
            docLink: "https://kla.kar.nic.in/assembly/questions/2025/Q305.pdf",
            govResponse: "Minister approved cold storage installation unit under NABARD infrastructure funding."
          }
        ],
        discussionsList: [
          {
            topic: "Debate on Monsoon Preparedness & Stormwater Drainage De-silting",
            date: "2025-06-18",
            session: "16th Assembly - 6th Session",
            dept: "Urban Development & Revenue",
            proceedingLink: "https://kla.kar.nic.in/assembly/proceedings/2025/proc_180625.pdf"
          }
        ],
        govtRecordsList: [
          {
            session: "16th Assembly - 6th Session (June 2025)",
            topic: "Public Accounts Committee (PAC) Audit Review on District Hospital Funds",
            source: "PAC Report No. 14 Tabled in Vidhana Sabha, Pg 45-68",
            docLink: "https://kla.kar.nic.in/assembly/pac/2025/pac_rep14.pdf"
          }
        ]
      },
      {
        yearNum: 4,
        yearLabel: "Year 4 (2026-27)",
        sessionPeriod: "Apr 2026 - Mar 2027",
        attendancePct: Math.min(98, Math.max(75, 84 + ((seed * 3) % 14))),
        questionsCount: 16 + (seed % 7),
        discussionsCount: 9 + (seed % 5),
        projectsCount: 4 + (seed % 3),
        issuesRaised: 11 + (seed % 5),
        questionsList: [
          {
            qNo: `LA-Q-${400 + seed * 3 + 1}`,
            date: "2026-07-15",
            subject: "Smart Classroom Digital Board Installation across Taluk Govt Schools",
            ministry: "Primary & Secondary Education",
            docLink: "https://kla.kar.nic.in/assembly/questions/2026/Q412.pdf",
            govResponse: "Education Dept confirmed 100% smart classroom coverage targeted by end of fiscal year."
          }
        ],
        discussionsList: [
          {
            topic: "Special Motion: Decentralized Solar Pump Grants for Horticulture Farmers",
            date: "2026-08-04",
            session: "16th Assembly - 8th Session",
            dept: "Renewable Energy & Agriculture",
            proceedingLink: "https://kla.kar.nic.in/assembly/proceedings/2026/proc_040826.pdf"
          }
        ],
        govtRecordsList: [
          {
            session: "16th Assembly - 8th Session (August 2026)",
            topic: "Estimate Committee Verification on Rural Electrification & Feeder Lines",
            source: "Vidhana Sabha House Committee Record Session 8, Pg 130-155",
            docLink: "https://kla.kar.nic.in/assembly/hansard/2026/vol48.pdf"
          }
        ]
      },
      {
        yearNum: 5,
        yearLabel: "Year 5 (2027-28)",
        sessionPeriod: "Apr 2027 - Mar 2028",
        attendancePct: Math.min(99, Math.max(76, 85 + ((seed * 4) % 13))),
        questionsCount: 18 + (seed % 5),
        discussionsCount: 10 + (seed % 4),
        projectsCount: 6 + (seed % 2),
        issuesRaised: 12 + (seed % 4),
        questionsList: [
          {
            qNo: `LA-Q-${500 + seed * 3 + 1}`,
            date: "2027-09-10",
            subject: "5-Year Term Infrastructure Performance & Final Project Sanctions",
            ministry: "Planning, Program Monitoring & Stat",
            docLink: "https://kla.kar.nic.in/assembly/questions/2027/Q501.pdf",
            govResponse: "Planning Dept released final constituency utilization audit showing 94.2% fund disbursement."
          }
        ],
        discussionsList: [
          {
            topic: "Valedictory Debate: Review of 5-Year Assembly Legislative Outputs & Constituency Growth",
            date: "2028-02-14",
            session: "16th Assembly - 11th Final Session",
            dept: "Parliamentary Affairs & Finance",
            proceedingLink: "https://kla.kar.nic.in/assembly/proceedings/2028/proc_140228.pdf"
          }
        ],
        govtRecordsList: [
          {
            session: "16th Assembly - 11th Session (Final Assembly Term Review)",
            topic: "Comprehensive 5-Year Legislative Work Summary & Committee Attendance Roll",
            source: "Karnataka Vidhana Sabha Secretariat Master Registry 2023-2028, Vol 52, Pg 1-320",
            docLink: "https://kla.kar.nic.in/assembly/hansard/2028/final_summary.pdf"
          }
        ]
      }
    ]
  };

  // Legacy mappings for full backwards compatibility
  const assemblyPerformance = {
    attendancePct: fiveYearPerformance.overallAttendancePct,
    daysAttended: fiveYearPerformance.totalDaysAttended,
    totalSessions: fiveYearPerformance.totalAssemblySessions,
    billsIntroduced: fiveYearPerformance.totalBillsIntroduced,
    billsPassed: fiveYearPerformance.totalBillsPassed,
    debatesParticipated: fiveYearPerformance.totalDebatesParticipated
  };

  const assemblyQuestions = fiveYearPerformance.years.flatMap(y => y.questionsList.map(q => ({
    id: q.qNo,
    date: q.date,
    category: q.ministry,
    title: q.subject,
    type: "Starred",
    responseStatus: q.govResponse,
    docLink: q.docLink
  })));

  const assemblyDiscussions = fiveYearPerformance.years.flatMap(y => y.discussionsList.map(d => ({
    id: `disc-${d.date}`,
    date: d.date,
    topic: d.topic,
    duration: "20 mins",
    summary: `Session: ${d.session} | Related Dept: ${d.dept}`,
    proceedingLink: d.proceedingLink
  })));

  const govtDiscussionRecords = fiveYearPerformance.years.flatMap(y => y.govtRecordsList.map((g, idx) => ({
    id: `rec-${y.yearNum}-${idx}`,
    title: g.topic,
    role: "Legislative Participant",
    meetingDate: g.session,
    notes: `Official Source: ${g.source}`,
    docLink: g.docLink
  })));

  // Module 7: Development Projects
  const totalBudgetCr = (15 + (seed * 4.3) % 85).toFixed(2);
  const sampleProjects = [
    { id: `proj-${seed}-1`, title: `Four-Lane Bypass & Concrete Road Construction`, category: "Roads", costCr: parseFloat((3.5 + (seed % 12)).toFixed(2)), lengthKm: parseFloat((14.5 + (seed % 20)).toFixed(1)), location: `${mla.constituency} Main Junction`, status: "Completed", startDate: "2023-08-15", completionDate: "2024-11-20", description: "Upgraded major arterial state highway with LED streetlights and drainage." },
    { id: `proj-${seed}-2`, title: `100-Bed Multi-Specialty Hospital Upgrade`, category: "Schools & Hospitals", costCr: parseFloat((12.0 + (seed % 25)).toFixed(2)), capacity: "100 Beds + ICU Unit", location: `${mla.constituency} Sector 4`, status: "In Progress", startDate: "2024-01-10", completionDate: "2025-08-30", description: "Constructing diagnostic wing, dialysis unit, and maternity care center." },
    { id: `proj-${seed}-3`, title: `Model Govt High School & Smart Classroom Hub`, category: "Schools & Hospitals", costCr: parseFloat((2.4 + (seed % 5)).toFixed(2)), capacity: "1,200 Students", location: `${mla.constituency} Rural Block`, status: "Completed", startDate: "2023-06-01", completionDate: "2024-05-15", description: "Equipped 18 smart classrooms with STEM labs and sports ground." }
  ];

  // Module 8: Public Feedback & Ratings
  const ratings = {
    education: parseFloat((3.5 + (seed % 15) / 10).toFixed(1)),
    healthcare: parseFloat((3.2 + ((seed + 2) % 16) / 10).toFixed(1)),
    roads: parseFloat((3.0 + ((seed + 5) % 18) / 10).toFixed(1)),
    employment: parseFloat((3.1 + ((seed + 1) % 14) / 10).toFixed(1)),
    cleanliness: parseFloat((3.4 + ((seed + 3) % 15) / 10).toFixed(1)),
    safety: parseFloat((3.6 + ((seed + 4) % 13) / 10).toFixed(1))
  };

  // Module 10: Declared Legal Cases
  const legalCases = seed % 3 === 0 ? [
    { caseNo: `CC-${1000 + seed}/2021`, court: "Karnataka High Court / Sessions Court", IPCSections: "Sec 143, 147 (Unlawful Assembly during Protest)", status: "Pending Trial", chargesFramed: false }
  ] : [];

  // Module 11: Election Affidavit Data
  const electionAffidavit = {
    filingDate: "2023-04-18",
    affidavitId: `ECI-KA-2023-${1000 + seed}`,
    education: seed % 2 === 0 ? "Post Graduate (M.A. / M.Sc / LL.B)" : "Graduate (B.A. / B.Com / B.E.)",
    verificationStatus: "Verified by ECI Returning Officer",
    pdfUrl: `https://affidavit.eci.gov.in/CandidateAffidavit?constituency=${encodeURIComponent(mla.constituency)}`
  };

  // Module 12: Assets & Liabilities
  const assetsMovableCr = parseFloat((1.2 + (seed * 1.5) % 18).toFixed(2));
  const assetsImmovableCr = parseFloat((3.5 + (seed * 3.2) % 45).toFixed(2));
  const totalLiabilitiesCr = parseFloat((0.4 + (seed * 0.8) % 8).toFixed(2));
  const netWorthCr = parseFloat((assetsMovableCr + assetsImmovableCr - totalLiabilitiesCr).toFixed(2));

  // Module 13: Politician Office Locations + Map Coordinates
  const officeLocation = {
    address: `MLA Constituent Office, Main Road, Near Taluk Office, ${mla.constituency}, ${mla.district} District, Karnataka - 560001`,
    phone: `+91 080-${2200 + seed} ${1000 + seed}`,
    email: `${mla.mla.toLowerCase().replace(/[^a-z]/g, '')}@karnataka.gov.in`,
    lat: 12.9716 + (seed % 50) * 0.05,
    lng: 77.5946 + (seed % 50) * 0.05,
    timing: "Mon - Sat: 10:00 AM - 5:00 PM"
  };

  // Module 14: Document Verification
  const documentVerification = {
    eciVerified: true,
    taxClearanceVerified: true,
    auditStatus: "Certified by Audit Officer",
    lastVerifiedDate: "2024-05-30"
  };

  // Module 16: AI Feedback Classification Templates
  const sampleComments = [
    {
      id: `com-${seed}-1`,
      author: "Ramesh K.",
      role: "Verified Resident",
      rating: 5,
      date: "2026-08-12",
      text: `The new road widening project in ${mla.constituency} has significantly reduced daily traffic jams. Appreciate the fast execution!`,
      aiCategory: "Positive",
      aiSeverity: "Low Risk",
      aiSummary: "Praise for road infrastructure completion and reduced congestion."
    },
    {
      id: `com-${seed}-2`,
      author: "Priya Sharma",
      role: "Resident",
      rating: 4,
      date: "2026-07-28",
      text: "Government hospital renovation is progressing well. Hoping for quick installation of the new X-ray machinery.",
      aiCategory: "Constructive Criticism",
      aiSeverity: "Medium Priority",
      aiSummary: "Hospital work appreciated; requests speedy X-ray equipment deployment."
    },
    {
      id: `com-${seed}-3`,
      author: "Basavaraj M.",
      role: "Verified Resident",
      rating: 2,
      date: "2026-06-15",
      text: "Streetlight repairs were addressed in Ward 4, but drainage clearing before monsoon needs urgent focus.",
      aiCategory: "Urgent Infrastructure Need",
      aiSeverity: "High Severity Concern",
      aiSummary: "Drainage clearance urgent priority before monsoon flood risk."
    }
  ];

  // CSE Major Project Modules: Evaluation, Service Survey, GIS Locality, and Promise Tracker
  const evaluationMetrics = {
    areaDevelopment: Math.min(98, Math.max(55, 72 + ((seed * 7) % 24))),
    problemResolution: Math.min(96, Math.max(50, 68 + ((seed * 5) % 26))),
    mlaAccessibility: Math.min(99, Math.max(60, 75 + ((seed * 4) % 22))),
    roadInfrastructure: Math.min(95, Math.max(48, 64 + ((seed * 8) % 28))),
    complaintSla: Math.min(97, Math.max(52, 70 + ((seed * 6) % 25))),
    informationTransparency: Math.min(98, Math.max(58, 76 + ((seed * 3) % 20))),
    cleanlinessSanitation: Math.min(94, Math.max(45, 62 + ((seed * 9) % 30))),
    publicTransport: Math.min(95, Math.max(50, 66 + ((seed * 4) % 27))),
    educationFacilities: Math.min(98, Math.max(62, 80 + ((seed * 2) % 18))),
    healthcareServices: Math.min(97, Math.max(56, 74 + ((seed * 5) % 22)))
  };

  const serviceSatisfaction = {
    roads: parseFloat((3.0 + ((seed * 3) % 20) / 10).toFixed(1)),
    water: parseFloat((3.2 + ((seed * 4) % 18) / 10).toFixed(1)),
    healthcare: parseFloat((3.4 + ((seed * 2) % 15) / 10).toFixed(1)),
    education: parseFloat((3.6 + ((seed * 5) % 14) / 10).toFixed(1)),
    wasteManagement: parseFloat((3.1 + ((seed * 6) % 18) / 10).toFixed(1)),
    grievanceHandling: parseFloat((3.3 + ((seed * 7) % 16) / 10).toFixed(1))
  };

  const localityMapData = [
    { wardNo: 1, wardName: "Central Town Ward", totalComplaints: 24 + (seed % 10), resolved: 18 + (seed % 8), pending: 6 + (seed % 3), topIssue: "Roads & Potholes", healthScore: 78 },
    { wardNo: 2, wardName: "North Residential Block", totalComplaints: 18 + (seed % 8), resolved: 14 + (seed % 6), pending: 4 + (seed % 3), topIssue: "Water Supply Pipeline", healthScore: 82 },
    { wardNo: 3, wardName: "Station Road & Market Ward", totalComplaints: 32 + (seed % 12), resolved: 22 + (seed % 9), pending: 10 + (seed % 4), topIssue: "Sanitation & Waste", healthScore: 68 },
    { wardNo: 4, wardName: "South Educational Zone", totalComplaints: 14 + (seed % 6), resolved: 12 + (seed % 5), pending: 2 + (seed % 2), topIssue: "Streetlights & Safety", healthScore: 88 },
    { wardNo: 5, wardName: "Rural Agriculture Belt", totalComplaints: 28 + (seed % 14), resolved: 19 + (seed % 8), pending: 9 + (seed % 5), topIssue: "Feeder Line Transformer", healthScore: 72 },
    { wardNo: 6, wardName: "Industrial & Transport Hub", totalComplaints: 22 + (seed % 9), resolved: 16 + (seed % 7), pending: 6 + (seed % 3), topIssue: "Drainage Overflow", healthScore: 75 }
  ];

  const promisesTracker = [
    { id: `p-${seed}-1`, title: "24x7 Rural Drinking Water Pipeline Project", category: "Water Supply", status: "In Progress", progressPct: 68, costCr: 14.5, targetDate: "2025-12-30", description: "Laying 42 km ductile iron pipeline connecting 18 villages to central filtration plant.", citizenUpdatesCount: 14 },
    { id: `p-${seed}-2`, title: "4-Lane State Highway Bypass & Flyover", category: "Roads & Infra", status: "Completed", progressPct: 100, costCr: 28.0, targetDate: "2024-08-15", description: "Constructed 4-lane concrete arterial bypass reducing city transit time by 25 mins.", citizenUpdatesCount: 22 },
    { id: `p-${seed}-3`, title: "100-Bed Govt Multi-Specialty Hospital ICU Unit", category: "Healthcare", status: "Approved", progressPct: 35, costCr: 18.2, targetDate: "2026-05-30", description: "Sanctioned state grant for diagnostic wing, dialysis unit, and trauma emergency ward.", citizenUpdatesCount: 9 },
    { id: `p-${seed}-4`, title: "Model Smart High Schools with Digital STEM Labs", category: "Education", status: "Completed", progressPct: 100, costCr: 4.8, targetDate: "2024-03-20", description: "Equipped 12 government schools with interactive digital boards and computer labs.", citizenUpdatesCount: 18 },
    { id: `p-${seed}-5`, title: "Decentralized Solar Agricultural Feeder Station", category: "Energy & Rural", status: "Delayed", progressPct: 42, costCr: 9.6, targetDate: "2025-03-31", description: "5 MW solar power plant to provide daytime power to local irrigation pumps.", citizenUpdatesCount: 11 }
  ];

  const totalPromises = promisesTracker.length;
  const completedPromises = promisesTracker.filter((promise) => promise.status === "Completed").length;

  return {
    ...mla,
    photo,
    term: "2023 – 2028",
    fiveYearPerformance,
    assemblyPerformance,
    assemblyQuestions,
    assemblyDiscussions,
    govtDiscussionRecords,
    projectsCount: sampleProjects.length,
    totalBudgetCr,
    projects: sampleProjects,
    ratings,
    evaluationMetrics,
    serviceSatisfaction,
    localityMapData,
    promisesTracker,
    legalCasesCount: legalCases.length,
    legalCases,
    electionAffidavit,
    financials: {
      assetsMovableCr,
      assetsImmovableCr,
      totalLiabilitiesCr,
      netWorthCr
    },
    officeLocation,
    documentVerification,
    comments: sampleComments,
    promisesCount: totalPromises,
    promisesCompleted: completedPromises,
    promiseCompletionPct: Math.round((completedPromises / totalPromises) * 100),
    satisfactionScore: Math.min(96, Math.max(52, 65 + ((seed * 7) % 28)))
  };
}

const KARNATAKA_MLAS = KARNATAKA_MLAS_RAW.map(generateMlaProfileData);
