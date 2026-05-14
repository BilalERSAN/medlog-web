import { BilingualString } from "./blog";

export type Department = {
  id: string;
  slug: string;
  name: BilingualString;
  description: BilingualString;
  icon: string;
};

export const departments: Department[] = [
  {
    id: "d1",
    slug: "plastic-surgery",
    name: { en: "Plastic, Reconstructive and Aesthetic Surgery", ar: "الجراحة التجميلية والترميمية" },
    description: { en: "Specialized in aesthetic and reconstructive guidance, providing modern and reliable surgical information.", ar: "متخصصون في التوجيه التجميلي والترميمي، مع توفير معلومات جراحية حديثة وموثوقة." },
    icon: "face"
  },
  {
    id: "d2",
    slug: "ear-nose-throat",
    name: { en: "Ear, Nose, and Throat (ENT)", ar: "الأنف والأذن والحنجرة" },
    description: { en: "Comprehensive expertise in head and neck surgery with advanced diagnostic and treatment insights.", ar: "خبرة شاملة في جراحة الرأس والرقبة مع رؤى متقدمة للتشخيص والعلاج." },
    icon: "hearing"
  },
  {
    id: "d3",
    slug: "cardiovascular",
    name: { en: "Cardiovascular Surgery", ar: "جراحة القلب والأوعية الدموية" },
    description: { en: "Uncompromising standards in cardiovascular health and expertise in minimally invasive surgery.", ar: "معايير لا هوادة فيها في صحة القلب والأوعية الدموية وخبرة في الجراحة طفيفة التوغل." },
    icon: "cardiology"
  },
  {
    id: "d4",
    slug: "urology",
    name: { en: "Urology", ar: "جراحة المسالك البولية" },
    description: { en: "The latest treatment approaches in robotic surgery and uro-oncology.", ar: "أحدث أساليب العلاج في الجراحة الروبوتية وطب أورام المسالك البولية." },
    icon: "urology"
  },
  {
    id: "d5",
    slug: "ophthalmology",
    name: { en: "Ophthalmology (Eye Diseases)", ar: "طب العيون (أمراض العيون)" },
    description: { en: "Expert medical teams for clear and healthy vision with advanced diagnostic technologies.", ar: "فرق طبية خبيرة من أجل رؤية واضحة وصحية مع تقنيات تشخيص متقدمة." },
    icon: "visibility"
  },
  {
    id: "d6",
    slug: "neurosurgery",
    name: { en: "Neurosurgery (Brain & Nerve)", ar: "جراحة المخ والأعصاب" },
    description: { en: "High-precision neurological approaches specialized in aneurysm surgery and stroke management.", ar: "مناهج عصبية عالية الدقة متخصصة في جراحة تمدد الأوعية الدموية وإدارة السكتات الدماغية." },
    icon: "neurology"
  },
  {
    id: "d7",
    slug: "dentistry",
    name: { en: "Oral and Dental Health", ar: "صحة الفم والأسنان" },
    description: { en: "Approaches that perfect your smile through aesthetic and functional dental treatments.", ar: "مناهج تتقن ابتسامتك من خلال علاجات الأسنان التجميلية والوظيفية." },
    icon: "dentistry"
  },
  {
    id: "d8",
    slug: "beauty-personal-care",
    name: { en: "Beauty and Personal Care", ar: "الجمال والعناية الشخصية" },
    description: { en: "Professional touches in laser treatments, skincare, and medical aesthetics.", ar: "لمسات احترافية في العلاج بالليزر، والعناية بالبشرة، والطب التجميلي." },
    icon: "spa"
  },
  {
    id: "d9",
    slug: "ivf-fertility",
    name: { en: "IVF and Infertility", ar: "أطفال الأنابيب والعقم" },
    description: { en: "Guiding your dreams of having a child with modern laboratory facilities and expert guidance.", ar: "توجيه أحلامك في إنجاب طفل من خلال مرافق مختبرية حديثة وإرشاد الخبراء." },
    icon: "child_care"
  },
  {
    id: "d10",
    slug: "obstetrics-gynecology",
    name: { en: "Obstetrics and Gynecology", ar: "أمراض النساء والتوليد" },
    description: { en: "Comprehensive, reliable, and modern medical approaches in women's health and childbirth.", ar: "مناهج طبية شاملة وموثوقة وحديثة في صحة المرأة والولادة." },
    icon: "female"
  },
  {
    id: "d11",
    slug: "hair-transplant",
    name: { en: "Hair Transplant and Aesthetics", ar: "زراعة الشعر وتجميله" },
    description: { en: "Modern hair transplant techniques and expert support with natural appearance and high success rates.", ar: "تقنيات زراعة الشعر الحديثة ودعم الخبراء بمظهر طبيعي ومعدلات نجاح عالية." },
    icon: "content_cut"
  }
];

export type Doctor = {
  id: string;
  departmentSlug: string;
  department: BilingualString;
  name: BilingualString;
  hospital: BilingualString;
  city: BilingualString;
  address?: BilingualString;
  about: BilingualString;
  image: string;
  icon: string;
}

export const doctors: Doctor[] = [
  {
    id: "afag-abbasova",
    departmentSlug: "ear-nose-throat",
    department: { en: "Ear, Nose, and Throat (ENT)", ar: "الأنف والأذن والحنجرة" },
    name: { en: "Dr. Afag Abbasova", ar: "د. أفاق عباسوفا" },
    hospital: { en: "Private Eryaman Hospital", ar: "مستشفى إريامان الخاص" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Sehit Osman Avci Mah. 49 Sokak No:6 Eryaman, Etimesgut / Ankara", ar: "الشهيد عثمان أفجي محلة. 49 سوكاك رقم: 6 إريامان، إتيمسغوت / أنقرة" },
    about: { en: "A graduate of Azerbaijan Medical University, she specialized in Ear, Nose, and Throat and obtained a Ph.D. After completing her equivalence process in Turkey in 2018, she has been providing expertise at A Life Etimesgut Hospital since 2021.", ar: "خريجة جامعة أذربيجان الطبية، تخصصت في الأنف والأذن والحنجرة وحصلت على درجة الدكتوراه. بعد الانتهاء من عملية المعادلة في تركيا في عام 2018، تقدم خبرتها في مستشفى أ لايف إتيمسغوت منذ عام 2021." },
    image: "/images/Afag%20Abbasova.webp",
    icon: "hearing"
  },
  {
    id: "erdal-simsek",
    departmentSlug: "cardiovascular",
    department: { en: "Cardiovascular Surgery", ar: "جراحة القلب والأوعية الدموية" },
    name: { en: "Prof. Dr. Erdal Simsek", ar: "أ.د. إردال شيمشك" },
    hospital: { en: "Private Koru Ankara Hospital", ar: "مستشفى كورو أنقرة الخاص" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Kizilirmak Mah. 1450. Sokak No:13 Cukurambar, Cankaya / Ankara", ar: "كيزيليرماك محلة. 1450 سوكاك رقم: 13 تشوكورامبار، تشانكايا / أنقرة" },
    about: { en: "Born in Ankara in 1972, he graduated from Ankara University Faculty of Medicine. Following his specialization in Cardiovascular Surgery, he continued his academic career and attained the rank of professor in 2020. He specializes in minimally invasive heart surgeries.", ar: "ولد في أنقرة عام 1972، وتخرج من كلية الطب بجامعة أنقرة. بعد تخصصه في جراحة القلب والأوعية الدموية، واصل مسيرته الأكاديمية وحصل على درجة الأستاذية في عام 2020. متخصص في جراحات القلب طفيفة التوغل." },
    image: "/images/prof-dr-erdal-simsek.webp",
    icon: "cardiology"
  },
  {
    id: "arda-ozdemir",
    departmentSlug: "plastic-surgery",
    department: { en: "Plastic, Reconstructive and Aesthetic Surgery", ar: "الجراحة التجميلية والترميمية" },
    name: { en: "Op. Dr. Arda Ozdemir", ar: "الطبيب. أردا أوزدمير" },
    hospital: { en: "TOBB ETU Hospital", ar: "مستشفى TOBB ETU" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Yasam Caddesi No:5 Sogutozu, Cankaya / Ankara", ar: "شارع ياشام رقم: 5 سوجوت أوزو، تشانكايا / أنقرة" },
    about: { en: "Born in Ankara in 1992, he graduated from Hacettepe University Faculty of Medicine in 2016. In 2023, he successfully completed the European Plastic Surgery Board Examination and was awarded the title of FEBOPRAS.", ar: "ولد في أنقرة عام 1992، وتخرج من كلية الطب بجامعة حجة تبة في عام 2016. وفي عام 2023، أتم بنجاح امتحان المجلس الأوروبي للجراحة التجميلية وحصل على لقب FEBOPRAS." },
    image: "/images/Arda_Ozdemir_.webp",
    icon: "face"
  },
  {
    id: "hasan-biri",
    departmentSlug: "urology",
    department: { en: "Urology", ar: "جراحة المسالك البولية" },
    name: { en: "Prof. Dr. Hasan Biri", ar: "أ.د. حسن بيري" },
    hospital: { en: "Private Koru Ankara Hospital", ar: "مستشفى كورو أنقرة الخاص" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Kizilirmak Mah. 1450. Sokak No:13 Cukurambar, Cankaya / Ankara", ar: "كيزيليرماك محلة. 1450 سوكاك رقم: 13 تشوكورامبار، تشانكايا / أنقرة" },
    about: { en: "He graduated from Ankara University Faculty of Medicine in 1987. He completed his urology specialization at Gazi University. He specializes in robotic surgery, uro-oncology, and endourology.", ar: "تخرج من كلية الطب بجامعة أنقرة في عام 1987. أكمل تخصصه في جراحة المسالك البولية في جامعة غازي. وهو متخصص في الجراحة الروبوتية وطب أورام المسالك البولية وطب المسالك البولية الباطني." },
    image: "/images/prof-dr-hasan-biri.webp",
    icon: "urology"
  },
  {
    id: "rahmi-duman",
    departmentSlug: "ophthalmology",
    department: { en: "Ophthalmology (Eye Diseases)", ar: "طب العيون (أمراض العيون)" },
    name: { en: "Prof. Dr. Rahmi Duman", ar: "أ.د. فهمي دومان" },
    hospital: { en: "Private Clinic / Mediest International", ar: "عيادة خاصة / ميديست الدولية" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Ankara", ar: "أنقرة" },
    about: { en: "A graduate of Ankara University Faculty of Medicine, he completed his specialization in ophthalmology at the same university. Since 2024, he has been sharing his expertise at Mediest International Hospital.", ar: "خريج كلية الطب بجامعة أنقرة، وأكمل تخصصه في طب العيون في نفس الجامعة. منذ عام 2024، يشارك خبرته في مستشفى ميديست الدولي." },
    image: "/images/Rahmi_duman.webp",
    icon: "visibility"
  },
  {
    id: "iskender-daltaban",
    departmentSlug: "neurosurgery",
    department: { en: "Neurosurgery (Brain & Nerve)", ar: "جراحة المخ والأعصاب" },
    name: { en: "Op. Dr. Iskender Samet Daltaban", ar: "الطبيب. إسكندر صمد دالتابان" },
    hospital: { en: "A Life Hospital", ar: "مستشفى أ لايف" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Etimesgut / Ankara", ar: "إتيمسغوت / أنقرة" },
    about: { en: "He completed his medical and specialization training at Karadeniz Technical University. He is particularly experienced in stroke management and aneurysm surgery.", ar: "أكمل تدريبه الطبي وتخصصه في جامعة كارادينيز التقنية. وهو خبير بشكل خاص في إدارة السكتات الدماغية وجراحة تمدد الأوعية الدموية." },
    image: "/images/iskender_samet_daltaban.webp",
    icon: "neurology"
  },
  {
    id: "erkan-kuralay",
    departmentSlug: "cardiovascular",
    department: { en: "Cardiovascular Surgery", ar: "جراحة القلب والأوعية الدموية" },
    name: { en: "Prof. Dr. Erkan Kuralay", ar: "أ.د. أركان كورالاي" },
    hospital: { en: "A Life Hospital", ar: "مستشفى أ لايف" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Etimesgut / Ankara", ar: "إتيمسغوت / أنقرة" },
    about: { en: "Prof. Dr. Erkan Kuralay, serving within the A Life Health Group, specializes in coronary bypass, minimally invasive heart surgery, aortic aneurysms, and complex valve repairs.", ar: "البروفيسور الدكتور أركان كورالاي، الذي يعمل ضمن مجموعة أ لايف الصحية، متخصص في جراحة المجازة التاجية، وجراحة القلب طفيفة التوغل، وتمدد الأوعية الدموية الأبهري، وإصلاح الصمامات المعقدة." },
    image: "/images/Erkan_Kuralay.webp",
    icon: "cardiology"
  },
  {
    id: "hakan-unsal",
    departmentSlug: "dentistry",
    department: { en: "Oral and Dental Health", ar: "صحة الفم والأسنان" },
    name: { en: "Uzm. Dt. Hakan Unsal", ar: "طبيب الأسنان المتخصص. هاكان أونسال" },
    hospital: { en: "A Clinica Dent", ar: "عيادة أسنان A Clinica" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Mustafa Kemal Mah. Eskisehir Yolu 7. Km Cepa Ofis Kule, Cankaya / Ankara", ar: "مصطفى كمال محلة. طريق اسكي شهير 7. كم جيبا أوفيس كولي، تشانكايا / أنقرة" },
    about: { en: "He has been serving in the field of dentistry for over 12 years. He specializes in aesthetic and functional dental treatments.", ar: "يعمل في مجال طب الأسنان لأكثر من 12 عاماً. متخصص في علاجات الأسنان التجميلية والوظيفية." },
    image: "/images/hakan_unsal.webp",
    icon: "dentistry"
  },
  {
    id: "kiwi-beauty",
    departmentSlug: "beauty-personal-care",
    department: { en: "Beauty and Personal Care", ar: "الجمال والعناية الشخصية" },
    name: { en: "Expert Aesthetics and Care Team", ar: "فريق التجميل والعناية الخبير" },
    hospital: { en: "Kiwi Beauty Turkey", ar: "كيوي بيوتي تركيا" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Altay Mah. Orhanbey Sok. Kat:3 No:17 Eryaman, Etimesgut / Ankara", ar: "محلة ألتاي. أورهانبي سوك. الطابق: 3 رقم: 17 إريامان، إتيمسغوت / أنقرة" },
    about: { en: "Kiwi Beauty Turkey provides services in laser hair removal, skincare, permanent makeup, and aesthetic applications. It serves international clients, primarily from the USA, UK, and the Netherlands.", ar: "تقدم كيوي بيوتي تركيا خدمات إزالة الشعر بالليزر والعناية بالبشرة والمكياج الدائم والتطبيقات التجميلية. تخدم العملاء الدوليين، وخاصة من الولايات المتحدة الأمريكية والمملكة المتحدة وهولندا." },
    image: "/images/kiwi_beauty_1.webp",
    icon: "spa"
  },
  {
    id: "semra-sertyel",
    departmentSlug: "ivf-fertility",
    department: { en: "IVF and Infertility", ar: "أطفال الأنابيب والعقم" },
    name: { en: "Dr. Semra Sertyel", ar: "د. سمراء سرتيل" },
    hospital: { en: "A Life Hospital", ar: "مستشفى أ لايف" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Etimesgut / Ankara", ar: "إتيمسغوت / أنقرة" },
    about: { en: "I graduated from Middle East Technical University and started working at Sevgi Hospital’s IVF Laboratory. In 2000, I took part in the building process of Memorial Hospital’s IVF Laboratory and continued to work there as IVF Laboratory Director until 2007. I started specializing in Male infertility and genetics here. Then, I founded the IVF Laboratory for HRS Hospital and directed the laboratory between 2007-2009. In 2009, I started working at German Hospital in İstanbul as the director. Here, I studied mature spermatozoa selection for ICSI cases and how to improve the process. After that, I started working as the director of Centrum Clinic’s IVF Laboratory. Here, I specialized in new generation ELSI/ROSI techniques (Tanaka Method).", ar: "تخرجت من جامعة الشرق الأوسط التقنية وبدأت العمل في مختبر أطفال الأنابيب بمستشفى سفجي. في عام 2000، شاركت في عملية بناء مختبر أطفال الأنابيب في مستشفى ميموريال واستمررت في العمل هناك كمديرة لمختبر أطفال الأنابيب حتى عام 2007. بدأت التخصص في العقم عند الذكور وعلم الوراثة هنا. بعد ذلك، أسست مختبر أطفال الأنابيب لمستشفى HRS وأدرت المختبر بين 2007-2009. في عام 2009، بدأت العمل كمديرة في المستشفى الألماني في إسطنبول. هنا، قمت بدراسة اختيار الحيوانات المنوية الناضجة لحالات الحقن المجهري وكيفية تحسين العملية. بعد ذلك، بدأت العمل كمديرة لمختبر أطفال الأنابيب في عيادة سنتروم. هنا، تخصصت في تقنيات الجيل الجديد ELSI/ROSI (طريقة تاناكا)." },
    image: "/images/semra_sertyel.webp",
    icon: "child_care"
  },
  {
    id: "mesut-tul",
    departmentSlug: "urology",
    department: { en: "Urology", ar: "جراحة المسالك البولية" },
    name: { en: "Op. Dr. Mesut Tul", ar: "الطبيب. مسعود تول" },
    hospital: { en: "A Life Hospital", ar: "مستشفى أ لايف" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Etimesgut / Ankara", ar: "إتيمسغوت / أنقرة" },
    about: { en: "Urology is a branch of medicine that requires deep experience, where sensitive functions directly affecting quality of life and oncological risks are managed. Op. Dr. Mesut Tul, who stands out with his academic knowledge and a quarter-century of surgical experience, provides trust-oriented and modern solutions to his patients. Having laid his medical foundations at Istanbul University Faculty of Medicine, he completed his specialization at Ankara Numune Training and Research Hospital. Throughout his career, he has successfully managed numerous uro-oncological surgery and infertility cases.", ar: "المسالك البولية هي فرع من فروع الطب التي تتطلب خبرة عميقة، حيث يتم إدارة الوظائف الحساسة التي تؤثر بشكل مباشر على نوعية الحياة والمخاطر الأورام. الطبيب مسعود تول، الذي يبرز بمعرفته الأكاديمية وربع قرن من الخبرة الجراحية، يقدم حلولاً موجهة نحو الثقة وحديثة لمرضاه. بعد أن وضع أسسه الطبية في كلية الطب بجامعة إسطنبول، أكمل تخصصه في مستشفى تدريب وبحوث أنقرة نوموني. طوال حياته المهنية، أدار بنجاح العديد من حالات جراحة أورام المسالك البولية والعقم." },
    image: "/images/mesut_tul.webp",
    icon: "urology"
  },
  {
    id: "osman-denizhan-ozgun",
    departmentSlug: "obstetrics-gynecology",
    department: { en: "Obstetrics and Gynecology", ar: "أمراض النساء والتوليد" },
    name: { en: "Op. Dr. Osman Denizhan Ozgun", ar: "الطبيب. عثمان دنيزهان أوزجون" },
    hospital: { en: "A Life Hospital", ar: "مستشفى أ لايف" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Etimesgut / Ankara", ar: "إتيمسغوت / أنقرة" },
    about: { en: "Graduating from Ankara University Faculty of Medicine in 1989, Op. Dr. Osman Denizhan Özgün completed his specialization at Ankara Zübeyde Hanım Etlik Maternity Hospital. Throughout his career, he has founded and directed IVF centers in prestigious institutions such as Sevgi Hospital, Güven Hospital, and Medicana. He has deep experience in infertility treatment, IVF and Microinjection (ICSI) applications, advanced reproductive techniques, and laparoscopic surgery. He currently serves as the IVF Center Director at A Life Health Group.", ar: "تخرج من كلية الطب بجامعة أنقرة في عام 1989، أكمل الطبيب عثمان دنيزهان أوزجون تخصصه في مستشفى أنقرة زبيدة هانم إتليك للولادة. طوال حياته المهنية، أسس وأدار مراكز أطفال الأنابيب في مؤسسات مرموقة مثل مستشفى سفجي، ومستشفى جوفين، وميديكانا. لديه خبرة عميقة في علاج العقم، وتطبيقات أطفال الأنابيب والحقن المجهري (ICSI)، والتقنيات الإنجابية المتقدمة، والجراحة بالمنظار. يعمل حالياً كمدير لمركز أطفال الأنابيب في مجموعة أ لايف الصحية." },
    image: "/images/osman_denizhan_ozgun.webp",
    icon: "female"
  },
  {
    id: "suat-cicek",
    departmentSlug: "hair-transplant",
    department: { en: "Hair Transplant and Aesthetics", ar: "زراعة الشعر وتجميله" },
    name: { en: "Director Suat Cicek", ar: "المدير سوات جيجيك" },
    hospital: { en: "Private Mediest International Medical Center", ar: "مركز ميديست الطبي الدولي الخاص" },
    city: { en: "Ankara", ar: "أنقرة" },
    address: { en: "Ankara", ar: "أنقرة" },
    about: { en: "Serving as the Hair Transplant Unit Director at Private Mediest International Medical Center, Suat Çiçek is known for his many years of experience in hair transplantation and aesthetics. He focuses on offering natural and permanent results to his patients with modern hair transplant techniques and personalized aesthetic approaches. In his Ankara-based work, he prioritizes high patient satisfaction and professional service standards.", ar: "يعمل كمدير لوحدة زراعة الشعر في مركز ميديست الطبي الدولي الخاص، سوات جيجيك معروف بخبرته لسنوات عديدة في زراعة الشعر والتجميل. وهو يركز على تقديم نتائج طبيعية ودائمة لمرضاه مع تقنيات زراعة الشعر الحديثة والأساليب التجميلية الشخصية. في عمله في أنقرة، يعطي الأولوية لرضا المرضى العالي ومعايير الخدمة المهنية." },
    image: "/images/Mediest_International_1.webp",
    icon: "content_cut"
  }
];
