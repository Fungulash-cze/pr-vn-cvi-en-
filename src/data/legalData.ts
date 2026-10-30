export interface Flashcard {
  id: string;
  categoryId: number;
  categoryName: string;
  code: string; // e.g. "Karta 1.1"
  question: string;
  clue: string; // Vodítko
  answer: string; // Odpověď
  legalBasis: string; // Právní opora
  cautionOrCaseLaw: string; // Praktický chyták / Judikatura
  lawTag: 'LZPS' | 'ZZS' | 'OZ' | 'TZ_ZRS';
  lawTagName: string;
}

export interface NumericDrillItem {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  legalBasis: string;
}

export type SemaphoreAction = 'SDĚLIT BEZ SOUHLASU' | 'ODEPŘÍT' | 'ZACHOVAT MLČENLIVOST' | 'OZNÁMIT BEZ SOUHLASU' | 'PŘEDLOŽIT BEZ SOUHLASU';

export interface SemaphoreDrillItem {
  id: number;
  situation: string;
  correctAction: SemaphoreAction;
  options: SemaphoreAction[];
  legalBasis: string;
  explanation: string;
}

export interface XRaySentence {
  id: string;
  text: string;
  isError: boolean;
  errorNumber?: number; // 1, 2, 3
  explanation: string;
}

export interface XRayDocument {
  id: string;
  title: string;
  documentType: string;
  totalErrors: number;
  metaInfo: {
    institution: string;
    protocolNo: string;
    date: string;
  };
  sentences: XRaySentence[];
}

export interface CategoryInfo {
  id: number;
  title: string;
  shortTitle: string;
  lawTag: 'LZPS' | 'ZZS' | 'OZ' | 'TZ_ZRS';
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 1,
    title: 'Ústavní základy, Úmluva o biomedicíně a základní pojmy ZZS',
    shortTitle: 'Ústava, Úmluva & Základní pojmy',
    lawTag: 'LZPS',
  },
  {
    id: 2,
    title: 'Informovaný souhlas, poučovací povinnost a negativní reverz',
    shortTitle: 'Souhlas, Poučení & Reverz',
    lawTag: 'ZZS',
  },
  {
    id: 3,
    title: 'Dříve vyslovené přání (DVP), nezletilí a osoby s omezenou svéprávností',
    shortTitle: 'DVP, Nezletilí & Svéprávnost',
    lawTag: 'OZ',
  },
  {
    id: 4,
    title: 'Nedobrovolná hospitalizace (detence) a omezovací prostředky',
    shortTitle: 'Detence & Omezovací prostředky',
    lawTag: 'TZ_ZRS',
  },
  {
    id: 5,
    title: 'Povinná mlčenlivost a zdravotnická dokumentace',
    shortTitle: 'Mlčenlivost & Dokumentace',
    lawTag: 'ZZS',
  },
  {
    id: 6,
    title: 'Odpovědnost ve zdravotnictví, smlouva o péči o zdraví a stížnosti',
    shortTitle: 'Odpovědnost, Smlouva & Stížnosti',
    lawTag: 'OZ',
  },
  {
    id: 7,
    title: 'Specifické zdravotní služby a veřejné zdravotní pojištění',
    shortTitle: 'Specifické služby & Pojištění',
    lawTag: 'ZZS',
  },
];

export const FLASHCARDS: Flashcard[] = [
  // --- Okruh 1 ---
  {
    id: 'k1-1',
    categoryId: 1,
    categoryName: 'Ústavní základy, Úmluva o biomedicíně a základní pojmy ZZS',
    code: 'Karta 1.1',
    question: 'Jaký je právní vztah mezi Úmluvou o lidských právech a biomedicíně (č. 96/2001 Sb. m. s.) a českými zákony (např. ZZS a OZ)?',
    clue: 'Čl. 10 Ústavy ČR.',
    answer: 'Úmluva je vyhlášenou mezinárodní smlouvou o lidských právech, která je součástí českého právního řádu a má aplikační přednost před zákonem. Stanoví-li český zákon něco v rozporu s Úmluvou, použije se Úmluva (pokud zákon neposkytuje pacientovi širší míru ochrany dle čl. 27 Úmluvy).',
    legalBasis: 'Čl. 10 Ústavy ČR; čl. 27 Úmluvy o lidských právech a biomedicíně (č. 96/2001 Sb. m. s.).',
    cautionOrCaseLaw: 'Aplikační přednost neznamená, že běžný soud může český zákon zrušit – pouze jej v konkrétním případě nepoužije a aplikuje přímo normu Úmluvy, případně věc předloží Ústavnímu soudu.',
    lawTag: 'LZPS',
    lawTagName: 'Úmluva & LZPS',
  },
  {
    id: 'k1-2',
    categoryId: 1,
    categoryName: 'Ústavní základy, Úmluva o biomedicíně a základní pojmy ZZS',
    code: 'Karta 1.2',
    question: 'Jaké je základní ústavní a mezinárodněprávní pravidlo pro jakýkoliv lékařský zákrok a do kterého základního práva dle Listiny (LZPS) zasahuje zákrok provedený bez souhlasu?',
    clue: 'Čl. 5 Úmluvy o biomedicíně a čl. 7 LZPS.',
    answer: 'Jakýkoliv zákrok v oblasti péče o zdraví lze provést pouze za podmínky, že k němu dotčená osoba poskytla svobodný a informovaný souhlas. Zákrok provedený bez platného souhlasu (mimo zákonné výjimky) je přímým zásahem do nedotknutelnosti osoby a jejího soukromí.',
    legalBasis: 'Čl. 5 Úmluvy o biomedicíně; čl. 7 odst. 1 Listiny základních práv a svobod (č. 2/1993 Sb.).',
    cautionOrCaseLaw: 'Zásah do čl. 7 odst. 1 LZPS nastává i tehdy, když byl zákrok bez souhlasu proveden medicínsky zcela bezchybně (lege artis) a pacientovi objektivně prospěl!',
    lawTag: 'LZPS',
    lawTagName: 'Úmluva & LZPS',
  },
  {
    id: 'k1-3',
    categoryId: 1,
    categoryName: 'Ústavní základy, Úmluva o biomedicíně a základní pojmy ZZS',
    code: 'Karta 1.3',
    question: 'Jaký je zákonný rozdíl mezi „neodkladnou péčí“ a „akutní péčí“ podle zákona o zdravotních službách (ZZS)?',
    clue: '§ 5 odst. 1 písm. a) a b) ZZS – sleduj bezprostřednost ohrožení a možnost ošetření bez souhlasu.',
    answer: 'Neodkladná péče odvrací náhlé stavy, které bezprostředně ohrožují život, mohly by vést k náhlému úmrtí, vážně ohrozit zdraví nebo působí náhlou a intenzivní bolest. Akutní péče odvrací či snižuje riziko vážného zhoršení stavu, aby byly včas zjištěny skutečnosti pro léčbu nebo aby pacient neohrozil sebe či okolí.',
    legalBasis: '§ 5 odst. 1 písm. a) a b) zákona č. 372/2011 Sb. (ZZS).',
    cautionOrCaseLaw: 'Zásadní praktický rozdíl: Bez souhlasu zletilého svéprávného pacienta lze poskytnout pouze neodkladnou péči (§ 38 odst. 3 ZZS), nikoliv péči akutní! Akutní péči bez souhlasu lze poskytnout jen u nezletilého nebo osoby s omezenou svéprávností, nelze-li souhlas zástupce získat bez zbytečného odkladu (§ 38 odst. 5 ZZS).',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k1-4',
    categoryId: 1,
    categoryName: 'Ústavní základy, Úmluva o biomedicíně a základní pojmy ZZS',
    code: 'Karta 1.4',
    question: 'Co je to „nezbytná péče“ podle § 5 odst. 1 písm. c) ZZS?',
    clue: 'Pozor na záměnu s neodkladnou péčí – týká se specifické skupiny pacientů.',
    answer: 'Nezbytná péče je péče, kterou z lékařského hlediska vyžaduje zdravotní stav pacienta, který je zahraničním pojištěncem, s přihlédnutím k povaze dávek a očekávané délce pobytu na území ČR (aby nemusel předčasně ukončit pobyt).',
    legalBasis: '§ 5 odst. 1 písm. c) zákona č. 372/2011 Sb. (ZZS).',
    cautionOrCaseLaw: 'V běžné řeči se slovo „nezbytná“ plete s „neodkladnou“. V ZZS má však pojem nezbytná péče úzký technický význam pro přeshraniční čerpání zdravotní péče cizinci.',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k1-5',
    categoryId: 1,
    categoryName: 'Ústavní základy, Úmluva o biomedicíně a základní pojmy ZZS',
    code: 'Karta 1.5',
    question: 'Jak zákon o zdravotních službách definuje „náležitou odbornou úroveň“ (postup lege artis) a jaké 4 prvky tato definice obsahuje?',
    clue: '§ 4 odst. 5 ZZS.',
    answer: 'Poskytování zdravotních služeb: 1. podle pravidel vědy a uznávaných medicínských postupů, 2. při respektování individuality pacienta, 3. s ohledem na konkrétní podmínky, 4. s ohledem na objektivní možnosti.',
    legalBasis: '§ 4 odst. 5 zákona č. 372/2011 Sb. (ZZS); v soukromém právu § 2643 odst. 1 OZ (péče řádného odborníka).',
    cautionOrCaseLaw: 'Doporučené postupy (guidelines) odborných společností nejsou obecně závazným právním předpisem. Lékař se od nich smí (a někdy musí) odchýlit kvůli individualitě pacienta, musí však odklon odborně zdůvodnit v dokumentaci. Zda šlo o postup lege artis, je v soudním sporu právní otázkou pro soud, nikoliv pro znalce.',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k1-6',
    categoryId: 1,
    categoryName: 'Ústavní základy, Úmluva o biomedicíně a základní pojmy ZZS',
    code: 'Karta 1.6',
    question: 'Za jakých podmínek lze poskytovat telemedicínské zdravotní služby podle § 11c ZZS a prováděcí vyhlášky?',
    clue: 'Novela č. 240/2024 Sb. a vyhláška č. 30/2025 Sb.',
    answer: 'Telemedicína není samostatným druhem péče, ale způsobem poskytování zdravotních služeb na dálku. Může ji poskytovat jen poskytovatel s oprávněním k poskytování zdravotních služeb při splnění technických požadavků: šifrovaný komunikační kanál, ověření identity pacienta i zdravotníka a souhlas pacienta v případě záznamu komunikace.',
    legalBasis: '§ 11 odst. 5 a § 11c zákona č. 372/2011 Sb. (ZZS); vyhláška č. 30/2025 Sb., o telemedicínských zdravotních službách.',
    cautionOrCaseLaw: 'Zdravotní služby spočívající v telemedicíně (kde je přítomen jen zdravotník bez fyzické přítomnosti pacienta) lze poskytovat i mimo zdravotnické zařízení (např. z home office lékaře), pokud je zajištěna ochrana dat a soukromí (§ 11 odst. 5 ZZS).',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },

  // --- Okruh 2 ---
  {
    id: 'k2-1',
    categoryId: 2,
    categoryName: 'Informovaný souhlas, poučovací povinnost a negativní reverz',
    code: 'Karta 2.1',
    question: 'Kdy musí mít informovaný souhlas pacienta podle zákona o zdravotních službách a občanského zákoníku povinně PÍSEMNOU formu?',
    clue: '§ 34 odst. 2 ZZS a § 96 OZ (3 situace v ZZS + obecné pravidlo v OZ).',
    answer: 'Písemná forma souhlasu se vyžaduje: 1. vždy u souhlasu s hospitalizací, 2. určí-li tak poskytovatel s ohledem na charakter služeb, 3. stanoví-li tak jiný právní předpis – zejména zákon o specifických zdravotních službách (sterilizace, kastrace, IVF) a § 96 OZ (zásah, který zanechá trvalé, neodvratitelné a vážné následky nebo je spojen s vážným nebezpečím pro život nebo zdraví).',
    legalBasis: '§ 34 odst. 2 zákona č. 372/2011 Sb. (ZZS); § 96 zákona č. 89/2012 Sb. (OZ).',
    cautionOrCaseLaw: 'Nedodržení písemné formy tam, kde ji vyžaduje pouze vnitřní předpis poskytovatele, samo o sobě nezpůsobuje neplatnost souhlasu, pokud poskytovatel jinak (např. svědecky) prokáže, že pacient byl řádně poučen a souhlas udělil. Důkazní břemeno o poučení však nese poskytovatel!',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k2-2',
    categoryId: 2,
    categoryName: 'Informovaný souhlas, poučovací povinnost a negativní reverz',
    code: 'Karta 2.2',
    question: 'Jak funguje pravidlo nepřímé úměry u poučovací povinnosti lékaře ohledně rizik zákroku?',
    clue: 'Rozdíl mezi vitální indikací a estetickým/elektivním zákrokem.',
    answer: 'Čím méně je zákrok ze zdravotního hlediska naléhavý či nezbytný (typicky kosmetické, estetické nebo čistě plánované elektivní výkony), tím širší, podrobnější a přísnější je poučovací povinnost lékaře, a to i ohledně statisticky velmi vzácných rizik, pokud by měla závažné následky.',
    legalBasis: '§ 31 odst. 2 ZZS; § 94 a § 2638 OZ; judikatura NS a ÚS (např. sp. zn. 25 Cdo 4210/2014).',
    cautionOrCaseLaw: 'Učebnicový chyták: Lékař nemusí vyjmenovávat každou banální a snadno řešitelnou komplikaci, ale musí vždy upozornit na typická rizika daného výkonu a na ta vzácná rizika, která by v případě realizace znamenala těžkou újmu (ochrnutí, slepota, ztráta hlasu, smrt).',
    lawTag: 'OZ',
    lawTagName: 'Občanský zákoník',
  },
  {
    id: 'k2-3',
    categoryId: 2,
    categoryName: 'Informovaný souhlas, poučovací povinnost a negativní reverz',
    code: 'Karta 2.3',
    question: 'Za jakých podmínek může lékař zadržet informaci o nepříznivé diagnóze nebo prognóze (tzv. terapeutické privilegium / milosrdná lež) a v čem je občanský zákoník přísnější než ZZS?',
    clue: '§ 32 odst. 2 ZZS vs. § 2640 odst. 1 věta druhá OZ.',
    answer: 'Informaci lze zadržet v nezbytném rozsahu a po nezbytnou dobu, lze-li důvodně předpokládat, že by její podání způsobilo pacientovi závažnou újmu na zdraví. Občanský zákoník však stanoví vyvratitelnou domněnku: má se za to, že toto právo poskytovatel nemá, nepotvrdí-li mu zjevnost a vážnost nebezpečí jiná osoba poskytující péči o zdraví v daném oboru (druhý odborník).',
    legalBasis: '§ 32 odst. 2 a 3 zákona č. 372/2011 Sb. (ZZS); § 2640 zákona č. 89/2012 Sb. (OZ).',
    cautionOrCaseLaw: 'Informaci nelze zadržet nikdy, pokud: a) je to jediný způsob, jak pacientovi umožnit včasnou léčbu či prevenci, b) stav pacienta představuje riziko pro okolí, nebo c) pacient výslovně žádá přesnou a pravdivou informaci (§ 2640 odst. 2 OZ).',
    lawTag: 'OZ',
    lawTagName: 'Občanský zákoník',
  },
  {
    id: 'k2-4',
    categoryId: 2,
    categoryName: 'Informovaný souhlas, poučovací povinnost a negativní reverz',
    code: 'Karta 2.4',
    question: 'Kdy se pacient NEMŮŽE vzdát podání informace o svém zdravotním stavu?',
    clue: '§ 32 odst. 1 ZZS – ochrana třetích osob.',
    answer: 'Pacient se nemůže vzdát informace (a lékař mu ji musí sdělit i proti jeho vůli), pokud jde o informaci, že pacient trpí infekční nemocí nebo jinou nemocí, v souvislosti s níž může ohrozit zdraví nebo život jiných osob.',
    legalBasis: '§ 32 odst. 1 věta poslední zákona č. 372/2011 Sb. (ZZS); § 2641 OZ.',
    cautionOrCaseLaw: 'Záznam o vzdání se informace musí být součástí zdravotnické dokumentace a podepisuje jej jak zdravotnický pracovník, tak pacient (§ 32 odst. 1 ZZS).',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k2-5',
    categoryId: 2,
    categoryName: 'Informovaný souhlas, poučovací povinnost a negativní reverz',
    code: 'Karta 2.5',
    question: 'Co musí udělat lékař, pokud plně svéprávný pacient po řádném poučení odmítá život zachraňující výkon, a co když tento pacient odmítne podepsat negativní reverz?',
    clue: '§ 34 odst. 3 až 5 ZZS a nález ÚS sp. zn. I. ÚS 2078/16.',
    answer: 'Lékař musí rozhodnutí plně svéprávného pacienta respektovat a výkon nesmí provést násilím. Odmítá-li pacient písemný reverz podepsat (nebo mu v tom brání zdravotní stav), zaznamená to zdravotnický pracovník do dokumentace a záznam podepíše on a alespoň jeden svědek.',
    legalBasis: '§ 34 odst. 3–5 ZZS; § 2642 OZ; nález Ústavního soudu sp. zn. I. ÚS 2078/16.',
    cautionOrCaseLaw: 'Podle nálezu I. ÚS 2078/16 lékař, který pacienta řádně poučil o následcích odmítnutí péče (včetně smrti) a respektoval jeho svobodný nesouhlas, nenese za smrt či poškození zdraví pacienta ani trestní, ani civilní odpovědnost.',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },

  // --- Okruh 3 ---
  {
    id: 'k3-1',
    categoryId: 3,
    categoryName: 'Dříve vyslovené přání (DVP), nezletilí a osoby s omezenou svéprávností',
    code: 'Karta 3.1',
    question: 'Jaké 3 formální náležitosti musí splňovat dříve vyslovené přání (DVP) sepsané mimo zdravotnické zařízení, aby bylo platné a závazné?',
    clue: '§ 36 odst. 2 a 3 ZZS.',
    answer: '1. Písemná forma, 2. úředně ověřený podpis pacienta, 3. součástí musí být písemné poučení o důsledcích rozhodnutí provedené lékařem v oboru všeobecné praktické lékařství (u něhož je pacient registrován) nebo jiným ošetřujícím lékařem v oboru zdravotní péče, s níž DVP souvisí.',
    legalBasis: '§ 36 odst. 2 a 3 zákona č. 372/2011 Sb. (ZZS); § 98 OZ.',
    cautionOrCaseLaw: 'Výjimka z úředně ověřeného podpisu (§ 36 odst. 4 ZZS): Pacient může DVP učinit i přímo při přijetí do péče nebo během hospitalizace záznamem do zdravotnické dokumentace – pak se úřední ověření nevyžaduje, ale záznam musí podepsat pacient, zdravotnický pracovník a svědek.',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k3-2',
    categoryId: 3,
    categoryName: 'Dříve vyslovené přání (DVP), nezletilí a osoby s omezenou svéprávností',
    code: 'Karta 3.2',
    question: 'Vyjmenuj všech 5 zákonných případů, kdy dříve vyslovené přání (DVP) NELZE respektovat nebo uplatnit.',
    clue: '§ 36 odst. 5 a 6 ZZS.',
    answer: 'DVP nelze respektovat/uplatnit, pokud:\n1. Od jeho vyslovení došlo k takovému medicínskému vývoji, že lze důvodně předpokládat, že by pacient souhlas vyslovil.\n2. Nabádá k postupům vedoucím k aktivnímu způsobení smrti (aktivní eutanazie).\n3. Jeho splnění by mohlo ohrozit jiné osoby.\n4. Zdravotní výkony byly započaty v době, kdy poskytovatel neměl DVP k dispozici, a jejich přerušení by vedlo k aktivnímu způsobení smrti.\n5. Jde o nezletilého pacienta nebo pacienta s omezenou svéprávností.',
    legalBasis: '§ 36 odst. 5 a 6 zákona č. 372/2011 Sb. (ZZS).',
    cautionOrCaseLaw: 'Odpojení od přístrojů či nezahájení marné a neúčelné léčby (withholding / withdrawing of futile treatment) na základě DVP nebo medicínské indikace se nepovažuje za aktivní způsobení smrti, ale za přirozený průběh umírání.',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k3-3',
    categoryId: 3,
    categoryName: 'Dříve vyslovené přání (DVP), nezletilí a osoby s omezenou svéprávností',
    code: 'Karta 3.3',
    question: 'Kdy může nezletilý pacient udělit souhlas se zdravotní službou sám a jakou roli hraje věková hranice 14 let při jeho nesouhlasu se zákrokem?',
    clue: '§ 35 odst. 1 ZZS vs. § 95 a § 100 odst. 1 OZ.',
    answer: 'Nezletilému lze poskytnout zdravotní služby na základě jeho vlastního souhlasu, je-li provedení úkonu přiměřené jeho rozumové a volní vyspělosti odpovídající jeho věku (§ 35 odst. 1 ZZS, § 95 OZ). Pokud však nezletilý dovršil 14 let a zákroku do integrity vážně odporuje, ačkoliv zákonný zástupce souhlasí, nelze zákrok provést bez souhlasu soudu (§ 100 odst. 1 OZ).',
    legalBasis: '§ 35 odst. 1 ZZS; § 95 a § 100 odst. 1 zákona č. 89/2012 Sb. (OZ).',
    cautionOrCaseLaw: 'Pravidlo v § 100 odst. 1 OZ (zákaz provést zákrok bez souhlasu soudu při vážném odporu) platí kromě nezletilých nad 14 let také pro zletilé osoby s omezenou svéprávností! Netýká se však stavů bezprostředního ohrožení života (§ 38 odst. 4 ZZS).',
    lawTag: 'OZ',
    lawTagName: 'Občanský zákoník',
  },
  {
    id: 'k3-4',
    categoryId: 3,
    categoryName: 'Dříve vyslovené přání (DVP), nezletilí a osoby s omezenou svéprávností',
    code: 'Karta 3.4',
    question: 'Rodiče 5letého dítěte z náboženských důvodů odmítají život zachraňující transfuzi při akutním krvácení po úrazu. Kdo rozhodne o podání krve? A kdo rozhodne, jde-li o plánovanou (odkladnou) operaci?',
    clue: '§ 38 odst. 4 ZZS vs. předběžné opatření / nahrazení souhlasu soudem.',
    answer: 'Jde-li o služby nezbytné k záchraně života nebo zamezení vážného poškození zdraví a rodiče souhlas odpírají, rozhodne o poskytnutí služeb přímo ošetřující zdravotnický pracovník (§ 38 odst. 4 ZZS). Jde-li o odkladný (plánovaný) zákrok, lékař sám rozhodnout nesmí a musí iniciovat rozhodnutí soudu (zpravidla přes OSPOD).',
    legalBasis: '§ 38 odst. 4 zákona č. 372/2011 Sb. (ZZS); § 100 odst. 2 a § 877 OZ; nález ÚS sp. zn. III. ÚS 459/03.',
    cautionOrCaseLaw: 'U § 38 odst. 5 ZZS (poskytnutí akutní péče dítěti bez souhlasu rodičů) je podmínkou, že souhlas rodičů nelze získat bez zbytečného odkladu (např. jsou nedostupní). Pokud jsou rodiče na místě a aktivně nesouhlasí, může lékař jejich nesouhlas prolomit sám jen u záchrany života nebo zamezení vážného poškození zdraví dle § 38 odst. 4 ZZS!',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },

  // --- Okruh 4 ---
  {
    id: 'k4-1',
    categoryId: 4,
    categoryName: 'Nedobrovolná hospitalizace (detence) a omezovací prostředky',
    code: 'Karta 4.1',
    question: 'Ve kterých 4 případech lze pacienta hospitalizovat bez jeho souhlasu podle § 38 odst. 1 ZZS?',
    clue: 'Ochranné léčení, infekce, duševní porucha/intoxikace s ohrožením, neodkladná péče.',
    answer: '1. Pravomocným rozhodnutím soudu uložené ochranné léčení nebo nařízené vyšetření duševního stavu.\n2. Nařízená izolace nebo karanténa dle zákona o ochraně veřejného zdraví.\n3. Pacient bezprostředně a závažným způsobem ohrožuje sebe nebo své okolí a jeví známky duševní poruchy (nebo jí trpí) nebo je pod vlivem návykové látky, nelze-li hrozbu odvrátit jinak.\n4. Stav vyžaduje neodkladnou péči a zároveň neumožňuje, aby pacient vyslovil souhlas.',
    legalBasis: '§ 38 odst. 1 zákona č. 372/2011 Sb. (ZZS).',
    cautionOrCaseLaw: 'Samotná přítomnost duševní poruchy (např. schizofrenie, demence) nikdy nestačí k nedobrovolné hospitalizaci! Musí být kumulativně splněno bezprostřední a závažné ohrožení sebe nebo okolí a princip subsidiarity (nelze odvrátit mírněji).',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k4-2',
    categoryId: 4,
    categoryName: 'Nedobrovolná hospitalizace (detence) a omezovací prostředky',
    code: 'Karta 4.2',
    question: 'Pacient je nedobrovolně hospitalizován na psychiatrii podle § 38 odst. 1 písm. c) ZZS. Jakou péči mu lze během této hospitalizace poskytovat BEZ jeho souhlasu?',
    clue: '§ 38 odst. 3 ZZS – zásadní rozdíl mezi držením v ústavu a léčebnými výkony.',
    answer: 'Bez souhlasu pacienta lze během nedobrovolné hospitalizace poskytovat pouze neodkladnou péči! Samotné převzetí do ústavu bez souhlasu neopravňuje lékaře k provádění běžných (neakutních) diagnostických či léčebných výkonů proti vůli pacienta.',
    legalBasis: '§ 38 odst. 3 zákona č. 372/2011 Sb. (ZZS); § 104 a násl. OZ; judikatura ESLP a ÚS.',
    cautionOrCaseLaw: 'Toto je jeden z nejčastějších omylů v klinické praxi. Nedobrovolná hospitalizace omezuje svobodu pohybu (čl. 8 LZPS), nikoliv automaticky tělesnou integritu (čl. 7 LZPS) pro veškerou další léčbu.',
    lawTag: 'LZPS',
    lawTagName: 'Úmluva & LZPS',
  },
  {
    id: 'k4-3',
    categoryId: 4,
    categoryName: 'Nedobrovolná hospitalizace (detence) a omezovací prostředky',
    code: 'Karta 4.3',
    question: 'Popiš přesnou časovou osu detenčního řízení od převzetí pacienta bez souhlasu (4 klíčové lhůty).',
    clue: '§ 40 ZZS a § 75–82 zákona č. 292/2013 Sb., o zvláštních řízeních soudních (z. ř. s.).',
    answer: '1. Do 24 hodin: Poskytovatel musí oznámit soudu převzetí (nebo dodatečné omezení volného pohybu), pokud pacient v této lhůtě neudělil písemný souhlas.\n2. Do 7 dnů od převzetí: Soud rozhodne usnesením o přípustnosti převzetí (1. fáze; usnesení se doručuje do 24 h od vydání).\n3. Do 3 měsíců od výroku o přípustnosti převzetí: Soud po jednání a posudku nezávislého znalce rozhodne rozsudkem o přípustnosti dalšího držení (2. fáze).\n4. Nejdéle 1 rok: Maximální doba, na kterou soud může další držení povolit (poté je nutné nové rozhodnutí).',
    legalBasis: 'Čl. 8 odst. 6 LZPS; § 40 ZZS; § 75, § 77, § 79, § 80 a § 82 zákona č. 292/2013 Sb. (z. ř. s.).',
    cautionOrCaseLaw: 'Znalcem ve 2. fázi detenčního řízení nesmí být lékař, který pracuje ve stejném zdravotnickém zařízení, v němž je pacient držen (§ 80 odst. 2 z. ř. s.).',
    lawTag: 'TZ_ZRS',
    lawTagName: 'Proces & ZŘS',
  },
  {
    id: 'k4-4',
    categoryId: 4,
    categoryName: 'Nedobrovolná hospitalizace (detence) a omezovací prostředky',
    code: 'Karta 4.4',
    question: 'Kdo může indikovat použití omezovacích prostředků (např. kurtů nebo psychofarmak podaných parenterálně k omezení pohybu) a jaká platí oznamovací povinnost vůči soudu?',
    clue: '§ 39 odst. 3 a § 40 odst. 1 písm. b) ZZS.',
    answer: 'Použití indikuje lékař; ve výjimečných neodkladných případech může indikovat i přítomný nelékařský zdravotnický pracovník (sestra), ale lékař musí být neprodleně informován a musí odůvodněnost omezení potvrdit. Pokud je dobrovolně hospitalizovaný pacient omezen ve volném pohybu až v průběhu léčení, musí to poskytovatel oznámit soudu do 24 hodin (nedá-li pacient v této lhůtě souhlas).',
    legalBasis: '§ 39 odst. 1–3 a § 40 odst. 1 písm. b) zákona č. 372/2011 Sb. (ZZS).',
    cautionOrCaseLaw: 'Mezi omezovací prostředky dle § 39 odst. 1 písm. f) ZZS patří i psychofarmaka podaná parenterálně (injekčně) za účelem omezení volného pohybu (tzv. chemická kurtáž), která není poskytováním léčby na žádost pacienta nebo soustavné léčby psychické poruchy.',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },

  // --- Okruh 5 ---
  {
    id: 'k5-1',
    categoryId: 5,
    categoryName: 'Povinná mlčenlivost a zdravotnická dokumentace',
    code: 'Karta 5.1',
    question: 'Kdy může lékař sdělit údaje ze zdravotnické dokumentace Policii ČR v trestním řízení BEZ souhlasu pacienta?',
    clue: '§ 8 odst. 5 trestního řádu vs. výjimky v TZ (§ 367, § 368) a zákoně o Policii ČR (§ 68 odst. 3).',
    answer: 'Obecně v trestním řízení pouze s předchozím souhlasem soudce (§ 8 odst. 5 tr. řádu). Bez souhlasu soudce i pacienta pouze tehdy, jde-li o: 1. plnění zákonné povinnosti překazit (§ 367 TZ) nebo oznámit (§ 368 TZ) taxativně vymezený trestný čin, 2. dotaz policie na dobu a místo poskytnutí služby pro účely pátrání po hledané nebo pohřešované osobě (§ 68 odst. 3 zák. o Policii ČR), nebo 3. obranu samotného lékaře/poskytovatele v trestním řízení (§ 51 odst. 2 písm. d) ZZS).',
    legalBasis: '§ 51 odst. 1 a 2 ZZS; § 8 odst. 5 zákona č. 141/1961 Sb. (tr. řád); § 367 a § 368 TZ; § 68 odst. 3 zákona č. 273/2008 Sb.',
    cautionOrCaseLaw: 'V civilním soudním řízení soudce zprostit lékaře mlčenlivosti nemůže! Zprostit jej může pouze pacient (nebo příslušný správní orgán z důležitého státního zájmu), ledaže jde o spor mezi pacientem a poskytovatelem, kde se poskytovatel brání žalobě (§ 51 odst. 2 písm. d) ZZS).',
    lawTag: 'TZ_ZRS',
    lawTagName: 'Trestní právo & Řád',
  },
  {
    id: 'k5-2',
    categoryId: 5,
    categoryName: 'Povinná mlčenlivost a zdravotnická dokumentace',
    code: 'Karta 5.2',
    question: 'Dospělá pacientka vyhledá lékaře po dokonaném znásilnění (§ 185 TZ) nebo ublížení na zdraví (§ 146 TZ). Další útok nehrozí a pacientka výslovně zakáže věc hlásit policii. Smí nebo musí to lékař oznámit?',
    clue: 'Srovnej taxativní výčet trestných činů v § 367 TZ (nepřekažení) a § 368 TZ (neoznámení).',
    answer: 'Lékař čin nesmí oznámit a je vázán povinnou mlčenlivostí! Trestný čin znásilnění (§ 185 TZ) ani běžné ublížení na zdraví (§ 146 TZ) nejsou uvedeny v § 368 TZ (neoznámení trestného činu). Znásilnění je uvedeno pouze v § 367 TZ (nepřekažení připravovaného či páchaného činu).',
    legalBasis: '§ 51 odst. 1 ZZS; § 367 a § 368 zákona č. 40/2009 Sb., trestní zákoník.',
    cautionOrCaseLaw: 'Naopak u trestného činu těžkého ublížení na zdraví (§ 145 TZ) nebo týrání svěřené osoby (§ 198 TZ – např. týrané dítě či senior) zákonná oznamovací povinnost podle § 368 TZ platí a prolomí mlčenlivost i proti vůli oběti či zákonných zástupců!',
    lawTag: 'TZ_ZRS',
    lawTagName: 'Trestní právo (TZ)',
  },
  {
    id: 'k5-3',
    categoryId: 5,
    categoryName: 'Povinná mlčenlivost a zdravotnická dokumentace',
    code: 'Karta 5.3',
    question: 'Jaká práva na informace a nahlížení do dokumentace mají osoby blízké po smrti pacienta, pokud jim zemřelý za života vyslovil ZÁKAZ informace sdělovat?',
    clue: '§ 33 odst. 4 ZZS.',
    answer: 'Pokud zemřelý pacient za života vyslovil zákaz sdělovat informace určitým osobám blízkým, lze jim informaci podat (a umožnit nahlížení v nezbytném rozsahu) pouze tehdy, je-li to v zájmu ochrany jejich zdraví nebo ochrany zdraví další osoby (např. při zjištění závažné genetické nebo infekční choroby).',
    legalBasis: '§ 33 odst. 4 věta druhá a § 65 odst. 1 písm. c) zákona č. 372/2011 Sb. (ZZS).',
    cautionOrCaseLaw: 'Pokud pacient za života žádný zákaz nevyslovil, mají osoby blízké po jeho smrti plné právo na informace o příčinách úmrtí, výsledku pitvy i právo nahlížet do dokumentace a pořizovat si její kopie (§ 33 odst. 4 věta první ZZS).',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k5-4',
    categoryId: 5,
    categoryName: 'Povinná mlčenlivost a zdravotnická dokumentace',
    code: 'Karta 5.4',
    question: 'Kdy a v jaké výši může poskytovatel požadovat po pacientovi úhradu za pořízení kopie nebo výpisu ze zdravotnické dokumentace?',
    clue: '§ 66 odst. 3 ZZS (ve znění novely č. 240/2024 Sb.) a rozsudek SDEU C-307/22 (GDPR).',
    answer: 'Za první pořízení výpisu nebo kopie zdravotnické dokumentace nelze po pacientovi požadovat žádnou úhradu (je zcela zdarma). Úhradu (ve výši účelně vynaložených nákladů spojených s pořízením a odesláním) lze požadovat pouze při opakované žádosti ohledně týchž údajů.',
    legalBasis: '§ 66 odst. 3 zákona č. 372/2011 Sb. (ZZS); čl. 15 odst. 3 nařízení GDPR; rozsudek SDEU ve věci C-307/22.',
    cautionOrCaseLaw: 'Lhůta pro pořízení výpisu nebo kopie poskytovatelem činí 30 dnů od obdržení žádosti pacienta (u nahlížení osob oprávněných dle § 65 odst. 2 ZZS je lhůta pro pořízení kopie 15 dnů – § 66 odst. 1 ZZS).',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },

  // --- Okruh 6 ---
  {
    id: 'k6-1',
    categoryId: 6,
    categoryName: 'Odpovědnost ve zdravotnictví, smlouva o péči o zdraví a stížnosti',
    code: 'Karta 6.1',
    question: 'Jaká je povaha odpovědnosti poskytovatele za škodu způsobenou vadou použitého lékařského přístroje nebo léčivého přípravku podle § 2936 OZ?',
    clue: 'Lze se této odpovědnosti zprostit (liberovat)?',
    answer: 'Jde o absolutní objektivní odpovědnost (odpovědnost bez ohledu na zavinění a bez možnosti liberace). Použije-li poskytovatel při zdravotní službě vadnou věc (přístroj, nástroj, implantát, lék), nahradí škodu tím způsobenou, i kdyby vadu nemohl při vynaložení veškeré péče odhalit.',
    legalBasis: '§ 2936 zákona č. 89/2012 Sb. (OZ).',
    cautionOrCaseLaw: 'Pozor: Odpovědnost dle § 2936 OZ dopadá na vadu či vnitřní vlastnost použité věci (např. prasklý vadný katétr, kontaminovaná šarže léku), nikoliv na běžné medicínské vedlejší účinky bezvadného léku, o nichž byl pacient řádně poučen. Poskytovatel má následně regresní nárok vůči výrobci či distributorovi.',
    lawTag: 'OZ',
    lawTagName: 'Občanský zákoník',
  },
  {
    id: 'k6-2',
    categoryId: 6,
    categoryName: 'Odpovědnost ve zdravotnictví, smlouva o péči o zdraví a stížnosti',
    code: 'Karta 6.2',
    question: 'Jakou míru jistoty vyžaduje judikatura Ústavního soudu při prokazování příčinné souvislosti (kauzálního nexu) mezi pochybením lékaře (non lege artis) a újmou na zdraví pacienta?',
    clue: 'Proč je požadavek 100% jistoty v medicínských sporech protiústavní?',
    answer: 'V medicínských sporech vzhledem ke složitosti biologických procesů nelze příčinnou souvislost prokázat se 100% jistotou. Ústavní soud judikuje, že požadavek 100% jistoty porušuje právo na spravedlivý proces (čl. 36 odst. 1 LZPS) a ke shledání příčinné souvislosti postačuje vysoká (převážná) míra pravděpodobnosti.',
    legalBasis: 'Čl. 36 odst. 1 LZPS; § 2910 a § 2913 OZ; nálezy Ústavního soudu sp. zn. I. ÚS 1919/08, IV. ÚS 14/17.',
    cautionOrCaseLaw: 'Pokud navíc poskytovatel porušil povinnost řádně a úplně vést zdravotnickou dokumentaci (§ 53 ZZS), nesmí jít výsledná důkazní nouze k tíži pacienta – soud může přistoupit k usnadnění či obrácení důkazního břemene ohledně odborného postupu.',
    lawTag: 'OZ',
    lawTagName: 'Občanský zákoník',
  },
  {
    id: 'k6-3',
    categoryId: 6,
    categoryName: 'Odpovědnost ve zdravotnictví, smlouva o péči o zdraví a stížnosti',
    code: 'Karta 6.3',
    question: 'Za jakých podmínek může poskytovatel jednostranně UKONČIT již probíhající péči o pacienta kvůli tomu, že pacient porušuje vnitřní řád nebo nedodržuje léčebný postup?',
    clue: '§ 48 odst. 2 písm. d) a § 48 odst. 4 ZZS – 2 kumulativní ochranné pojistky.',
    answer: 'Ukončit péči lze tehdy, pokud pacient závažně omezuje práva ostatních pacientů, úmyslně a soustavně nedodržuje navržený léčebný postup nebo se neřídí vnitřním řádem, A ZÁROVEŇ jsou splněny dvě podmínky: 1. jeho chování není způsobeno zdravotním stavem, a 2. ukončením péče nedojde k bezprostřednímu ohrožení života nebo vážnému poškození jeho zdraví.',
    legalBasis: '§ 48 odst. 2 písm. d), odst. 4 a 5 zákona č. 372/2011 Sb. (ZZS).',
    cautionOrCaseLaw: 'O odmítnutí přijetí do péče i o ukončení péče musí poskytovatel vždy vydat pacientovi písemnou zprávu s uvedením důvodu (§ 48 odst. 5 ZZS). Jinak se dopouští přestupku.',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },
  {
    id: 'k6-4',
    categoryId: 6,
    categoryName: 'Odpovědnost ve zdravotnictví, smlouva o péči o zdraví a stížnosti',
    code: 'Karta 6.4',
    question: 'Jak funguje dvoustupňový systém vyřizování stížností proti postupu poskytovatele podle § 93–94 ZZS a jaké jsou zákonné lhůty?',
    clue: '1. stupeň u poskytovatele, 2. stupeň u krajského úřadu.',
    answer: '1. Stížnost se podává nejprve poskytovateli, který ji musí vyřídit do 30 dnů (lze odůvodněně prodloužit o dalších 30 dnů). 2. Pokud stěžovatel s vyřízením nesouhlasí, může do 30 dnů od doručení (nebo marného uplynutí lhůty) podat stížnost příslušnému správnímu orgánu (typicky krajskému úřadu), který udělil oprávnění.',
    legalBasis: '§ 93 a § 94 zákona č. 372/2011 Sb. (ZZS).',
    cautionOrCaseLaw: 'Podání stížnosti nesmí být stěžovateli ani pacientovi na újmu (§ 93 odst. 3 ZZS) a vyřizování stížností nepodléhá správnímu řádu jako klasické správní řízení o právech a povinnostech.',
    lawTag: 'ZZS',
    lawTagName: 'Zákon o zdravotních službách',
  },

  // --- Okruh 7 ---
  {
    id: 'k7-1',
    categoryId: 7,
    categoryName: 'Specifické zdravotní služby a veřejné zdravotní pojištění',
    code: 'Karta 7.1',
    question: 'Jaké jsou věkové hranice a minimální lhůty na rozmyšlenou u sterilizace ze zdravotních důvodů a u sterilizace z jiných než zdravotních důvodů?',
    clue: '§ 13 až § 15 zákona č. 373/2011 Sb., o specifických zdravotních službách (ZSZS).',
    answer: 'Ze zdravotních důvodů: věk min. 18 let (u nezletilých a osob s omezenou svéprávností jen se souhlasem odborné komise a soudu), lhůta mezi informováním a udělením souhlasu bezprostředně před výkonem min. 7 dnů.\n\nZ jiných než zdravotních důvodů: věk min. 21 let (pouze plně svéprávný pacient), lhůta mezi informováním a souhlasem min. 14 dnů.',
    legalBasis: '§ 12–16 zákona č. 373/2011 Sb. (ZSZS).',
    cautionOrCaseLaw: 'Sterilizaci z jiných než zdravotních důvodů u nezletilého nebo u pacienta s omezenou svéprávností nelze provést za žádných okolností (ani se souhlasem soudu)!',
    lawTag: 'ZZS',
    lawTagName: 'Specifické služby (ZSZS)',
  },
  {
    id: 'k7-2',
    categoryId: 7,
    categoryName: 'Specifické zdravotní služby a veřejné zdravotní pojištění',
    code: 'Karta 7.2',
    question: 'Komu a do jakého věku lze provést umělé oplodnění (asistovanou reprodukci) a jak je upravena anonymita dárce?',
    clue: '§ 3, § 6 a § 10 zákona č. 373/2011 Sb. (ZSZS).',
    answer: 'Asistovanou reprodukci lze provést ženě v reprodukčním věku, pokud její věk nepřekročil 49 let, a to pouze na základě písemné žádosti neplodného páru, který tvoří žena a muž (žádost nesmí být starší než 6 měsíců). Poskytovatel je povinen zajistit vzájemnou anonymitu anonymního dárce a neplodného páru i dítěte.',
    legalBasis: '§ 3 odst. 2, § 6 odst. 1 a § 10 zákona č. 373/2011 Sb. (ZSZS).',
    cautionOrCaseLaw: 'Asistovanou reprodukci nelze v ČR podle platného zákona poskytnout jednotlivkyni (single ženě) bez partnera-muže. Muž z neplodného páru (i když není manželem ženy) se udělením souhlasu s umělým oplodněním stává ze zákona otcem dítěte (§ 778 OZ).',
    lawTag: 'ZZS',
    lawTagName: 'Specifické služby (ZSZS)',
  },
  {
    id: 'k7-3',
    categoryId: 7,
    categoryName: 'Specifické zdravotní služby a veřejné zdravotní pojištění',
    code: 'Karta 7.3',
    question: 'Jak změnil nález Ústavního soudu sp. zn. Pl. ÚS 52/23 (s účinností od 1. 7. 2025) právní úpravu změny pohlaví transsexuálních pacientů?',
    clue: '§ 29 odst. 1 OZ a § 21 odst. 1 ZSZS.',
    answer: 'Ústavní soud zrušil zákonný požadavek chirurgického zákroku spojeného s onemožněním reprodukční funkce (sterilizace/kastrace) jako podmínku pro úřední (statusovou) změnu pohlaví z důvodu rozporu s lidskou důstojností a nedotknutelností osoby (čl. 7 odst. 1 LZPS, čl. 8 EÚLP).',
    legalBasis: 'Nález Ústavního soudu sp. zn. Pl. ÚS 52/23; § 29 odst. 1 OZ; § 21–23 zákona č. 373/2011 Sb. (ZSZS).',
    cautionOrCaseLaw: 'Samotné chirurgické výkony směřující ke změně pohlaví na žádost pacienta (od 18 let po kladném stanovisku odborné komise MZ dle § 21 odst. 3 ZSZS) zůstávají medicínsky možné, ale nejsou již nutnou podmínkou pro změnu úředního zápisu v matrice.',
    lawTag: 'OZ',
    lawTagName: 'Občanský zákoník / ÚS',
  },
  {
    id: 'k7-4',
    categoryId: 7,
    categoryName: 'Specifické zdravotní služby a veřejné zdravotní pojištění',
    code: 'Karta 7.4',
    question: 'Za jakých podmínek musí zdravotní pojišťovna uhradit zdravotní službu, která je jinak z veřejného zdravotního pojištění NEHRAZENA, a co řekl Ústavní soud v nálezu Pl. ÚS 36/11 (tzv. nadstandardy)?',
    clue: '§ 16 zákona č. 48/1997 Sb. (ZVZP) a čl. 31 LZPS (výhrada zákona).',
    answer: 'Podle § 16 ZVZP pojišťovna hradí ve výjimečných případech i jinak nehrazené zdravotní služby, je-li jejich poskytnutí jedinou možností z hlediska zdravotního stavu pojištěnce (s předchozím souhlasem revizního lékaře, vyjma nebezpečí z prodlení). V nálezu Pl. ÚS 36/11 Ústavní soud konstatoval, že vymezení rozsahu bezplatné péče a ekonomicky náročnější varianty nesmí být ponecháno vyhlášce MZ, ale musí být stanoveno přímo zákonem (výhrada zákona dle čl. 31 LZPS).',
    legalBasis: 'Čl. 31 LZPS; § 13 a § 16 zákona č. 48/1997 Sb. (ZVZP); nález ÚS sp. zn. Pl. ÚS 36/11.',
    cautionOrCaseLaw: 'Žádnou zdravotní péči, kterou lze z medicínského hlediska poskytnout pouze jediným způsobem, nelze označit za ekonomicky náročnější variantu (nadstandard).',
    lawTag: 'LZPS',
    lawTagName: 'Veřejné pojištění (ZVZP)',
  },
];

export const NUMERIC_DRILL_ITEMS: NumericDrillItem[] = [
  {
    id: 1,
    question: 'Lhůta pro oznámení převzetí pacienta bez souhlasu soudu (§ 40 odst. 1 ZZS):',
    correctAnswer: '24 hodin',
    options: ['12 hodin', '24 hodin', '48 hodin', '7 dnů'],
    explanation: 'Poskytovatel je povinen oznámit soudu do 24 hodin převzetí pacienta bez jeho písemného souhlasu nebo dodatečné omezení volného pohybu.',
    legalBasis: '§ 40 odst. 1 zákona č. 372/2011 Sb. (ZZS)',
  },
  {
    id: 2,
    question: 'Lhůta, ve které musí soud rozhodnout o přípustnosti převzetí v 1. fázi detenčního řízení (§ 77 z. ř. s.):',
    correctAnswer: '7 dnů',
    options: ['24 hodin', '3 dny', '7 dnů', '30 dnů'],
    explanation: 'Soud rozhodne o přípustnosti převzetí do zdravotnického ústavu usnesením do 7 dnů ode dne, kdy k převzetí došlo.',
    legalBasis: '§ 77 zákona č. 292/2013 Sb. (z. ř. s.)',
  },
  {
    id: 3,
    question: 'Lhůta, ve které musí soud rozhodnout o přípustnosti dalšího držení v ústavu ve 2. fázi (§ 82 odst. 1 z. ř. s.):',
    correctAnswer: '3 měsíce od výroku o přípustnosti převzetí',
    options: ['30 dnů', '3 měsíce od výroku o přípustnosti převzetí', '6 měsíců', '1 rok'],
    explanation: 'Rozsudek o přípustnosti dalšího držení v ústavu musí soud vydat do 3 měsíců od právní moci výroku usnesení o přípustnosti převzetí.',
    legalBasis: '§ 82 odst. 1 zákona č. 292/2013 Sb. (z. ř. s.)',
  },
  {
    id: 4,
    question: 'Minimální věk, od kterého vážný odpor nezletilého brání provedení zákroku bez souhlasu soudu, i když rodiče souhlasí (§ 100 odst. 1 OZ):',
    correctAnswer: '14 let',
    options: ['12 let', '14 let', '15 let', '16 let'],
    explanation: 'Nezletilý, který dovršil 14 let, může účinně projevit vážný odpor proti zákroku do své tělesné integrity; v takovém případě nelze zákrok bez souhlasu soudu provést, ledaže jde o stav bezprostředně ohrožující život.',
    legalBasis: '§ 100 odst. 1 zákona č. 89/2012 Sb. (OZ)',
  },
  {
    id: 5,
    question: 'Minimální věk a lhůta na rozmyšlenou u sterilizace z JINÝCH než zdravotních důvodů (§ 13 a § 15 ZSZS):',
    correctAnswer: '21 let a 14 dnů',
    options: ['18 let a 7 dnů', '18 let a 14 dnů', '21 let a 7 dnů', '21 let a 14 dnů'],
    explanation: 'U sterilizace z jiných než zdravotních důvodů vyžaduje zákon věk alespoň 21 let a lhůtu mezi poučením a udělením souhlasu nejméně 14 dnů (na rozdíl od 18 let a 7 dnů ze zdravotních důvodů).',
    legalBasis: '§ 13 a § 15 zákona č. 373/2011 Sb. (ZSZS)',
  },
  {
    id: 6,
    question: 'Maximální věk ženy pro provedení umělého oplodnění – asistované reprodukce (§ 6 odst. 1 ZSZS):',
    correctAnswer: '49 let',
    options: ['40 let', '45 let', '49 let', '55 let'],
    explanation: 'Asistovanou reprodukci lze provést ženě v reprodukčním věku, pokud její věk nepřekročil 49 let.',
    legalBasis: '§ 6 odst. 1 zákona č. 373/2011 Sb. (ZSZS)',
  },
  {
    id: 7,
    question: 'Maximální stáří písemné žádosti neplodného páru o asistovanou reprodukci (§ 3 odst. 3 ZSZS):',
    correctAnswer: '6 měsíců',
    options: ['3 měsíce', '6 měsíců', '12 měsíců', '24 měsíců'],
    explanation: 'Písemná žádost neplodného páru o provedení asistované reprodukce nesmí být starší než 6 měsíců.',
    legalBasis: '§ 3 odst. 3 zákona č. 373/2011 Sb. (ZSZS)',
  },
  {
    id: 8,
    question: 'Základní lhůta pro vyřízení stížnosti poskytovatelem zdravotních služeb (§ 93 odst. 4 ZZS):',
    correctAnswer: '30 dnů',
    options: ['15 dnů', '30 dnů', '60 dnů', '90 dnů'],
    explanation: 'Poskytovatel je povinen vyřídit stížnost do 30 dnů ode dne jejího obdržení; tuto lhůtu může v odůvodněných případech prodloužit o dalších 30 dnů.',
    legalBasis: '§ 93 odst. 4 zákona č. 372/2011 Sb. (ZZS)',
  },
  {
    id: 9,
    question: 'Cena za PRVNÍ pořízení kopie zdravotnické dokumentace na žádost pacienta (§ 66 odst. 3 ZZS):',
    correctAnswer: '0 Kč – bezplatně',
    options: ['0 Kč – bezplatně', '5 Kč za stranu', 'účelně vynaložené náklady', '250 Kč paušál'],
    explanation: 'Po novele č. 240/2024 Sb. a v souladu s judikaturou SDEU (C-307/22) je první vyhotovení výpisu či kopie zdravotnické dokumentace na žádost pacienta zcela bezplatné.',
    legalBasis: '§ 66 odst. 3 zákona č. 372/2011 Sb. (ZZS); čl. 15 odst. 3 GDPR',
  },
  {
    id: 10,
    question: 'Maximální doba pobytu na lůžku u „jednodenní péče“ (§ 8 odst. 1 ZZS):',
    correctAnswer: 'kratší než 24 hodin',
    options: ['kratší než 12 hodin', 'kratší než 24 hodin', 'kratší než 48 hodin', 'do propuštění téhož kalendářního dne'],
    explanation: 'Jednodenní péče je zdravotní péče, při jejímž poskytnutí se vyžaduje pobyt pacienta na lůžku po dobu kratší než 24 hodin.',
    legalBasis: '§ 8 odst. 1 zákona č. 372/2011 Sb. (ZZS)',
  },
];

export const SEMAPHORE_DRILL_ITEMS: SemaphoreDrillItem[] = [
  {
    id: 1,
    situation: 'Policie ČR žádá bez souhlasu soudce informaci o době a místě ošetření celostátně pohřešované osoby.',
    correctAction: 'SDĚLIT BEZ SOUHLASU',
    options: ['SDĚLIT BEZ SOUHLASU', 'ODEPŘÍT', 'ZACHOVAT MLČENLIVOST'],
    legalBasis: '§ 68 odst. 3 zákona č. 273/2008 Sb., o Policii ČR',
    explanation: 'Zákon o Policii ČR dává policii oprávnění požadovat informaci o době a místě poskytnutí zdravotních služeb pro účely pátrání po hledané nebo pohřešované osobě i bez souhlasu soudce či pacienta.',
  },
  {
    id: 2,
    situation: 'Policie ČR žádá v trestním řízení pro přečin ublížení na zdraví (§ 146 TZ) zdravotnickou dokumentaci obviněného bez jeho souhlasu a bez souhlasu soudce.',
    correctAction: 'ODEPŘÍT',
    options: ['SDĚLIT BEZ SOUHLASU', 'ODEPŘÍT', 'PŘEDLOŽIT BEZ SOUHLASU'],
    legalBasis: '§ 8 odst. 5 zákona č. 141/1961 Sb. (trestní řád)',
    explanation: 'V trestním řízení lze údaje ze zdravotnické dokumentace vyžádat pouze s předchozím souhlasem soudce. Pouhá žádost policejního orgánu bez soudního příkazu k prolomení mlčenlivosti nestačí.',
  },
  {
    id: 3,
    situation: 'Soudce v civilním rozvodovém řízení vyzve psychiatra, aby bez souhlasu pacienta vypovídal o jeho duševní nemoci, s tím, že ho „jako soudce zprošťuje mlčenlivosti“.',
    correctAction: 'ODEPŘÍT',
    options: ['SDĚLIT BEZ SOUHLASU', 'ODEPŘÍT', 'PŘEDLOŽIT BEZ SOUHLASU'],
    legalBasis: '§ 51 odst. 1 a 2 zákona č. 372/2011 Sb. (ZZS)',
    explanation: 'Civilní soudce nemá pravomoc zprostit zdravotnického pracovníka mlčenlivosti! Zprostit jej může výhradně sám pacient (nebo příslušný správní orgán z důvodu vyššího státního zájmu).',
  },
  {
    id: 4,
    situation: 'Dospělá pacientka přijde po včerejším znásilnění (§ 185 TZ), další útok nehrozí, výslovně zakáže lékaři volat policii.',
    correctAction: 'ZACHOVAT MLČENLIVOST',
    options: ['OZNÁMIT BEZ SOUHLASU', 'ZACHOVAT MLČENLIVOST', 'SDĚLIT BEZ SOUHLASU'],
    legalBasis: '§ 51 odst. 1 ZZS; § 367 a § 368 trestního zákoníku',
    explanation: 'Trestný čin znásilnění (§ 185 TZ) je uveden pouze v § 367 TZ (povinnost překazit připravovaný či probíhající čin). V § 368 TZ (povinnost oznámit již dokonaný trestný čin) uveden NENÍ. Lékař proto musí zachovat mlčenlivost.',
  },
  {
    id: 5,
    situation: 'Pediatr zjistí u 4letého dítěte známky soustavného týrání rodiči (§ 198 TZ – týrání svěřené osoby). Rodiče zakazují kohokoliv informovat.',
    correctAction: 'OZNÁMIT BEZ SOUHLASU',
    options: ['OZNÁMIT BEZ SOUHLASU', 'ZACHOVAT MLČENLIVOST', 'ODEPŘÍT'],
    legalBasis: '§ 367 a § 368 TZ; § 10 odst. 4 zákona č. 359/1999 Sb. (ZSPOD)',
    explanation: 'Týrání svěřené osoby (§ 198 TZ) spadá jak pod povinnost překazit (§ 367 TZ), tak neprodleně oznámit (§ 368 TZ). Zároveň platí přísná oznamovací povinnost vůči OSPOD bez ohledu na nesouhlas rodičů.',
  },
  {
    id: 6,
    situation: 'Bývalý pacient zažaloval nemocnici o 2 miliony Kč za pochybení při operaci a nemocnice chce předložit soudu jeho dokumentaci na svou obranu, ačkoliv pacient ji mlčenlivosti nezprostil.',
    correctAction: 'PŘEDLOŽIT BEZ SOUHLASU',
    options: ['PŘEDLOŽIT BEZ SOUHLASU', 'ODEPŘÍT', 'ZACHOVAT MLČENLIVOST'],
    legalBasis: '§ 51 odst. 2 písm. d) zákona č. 372/2011 Sb. (ZZS)',
    explanation: 'Zákon o zdravotních službách výslovně stanoví výjimku z povinné mlčenlivosti pro obranu práv poskytovatele v řízení před soudem nebo jiným orgánem, uplatňuje-li pacient nároky vůči poskytovateli.',
  },
];

export const LEGAL_XRAY_DOCUMENTS: XRayDocument[] = [
  {
    id: 'doc-1',
    title: 'Dříve vyslovené přání',
    documentType: 'Právní instrument pacienta (§ 36 ZZS)',
    totalErrors: 3,
    metaInfo: {
      institution: 'Záznam předložený k založení do zdravotnické dokumentace',
      protocolNo: 'DVP/2026/0412-DVO',
      date: '12. května 2026',
    },
    sentences: [
      {
        id: 'doc1-s1',
        text: '„Já, níže podepsaný Jan Dvořák, nar. 12. 4. 1958, plně svéprávný, tímto pro případ, že bych se dostal do takového zdravotního stavu, ve kterém nebudu schopen vyslovit souhlas nebo nesouhlas s poskytnutím zdravotních služeb, vyslovuji toto dříve vyslovené přání.“',
        isError: false,
        explanation: 'V POŘÁDKU: Věta je plně v souladu s § 36 odst. 1 zákona o zdravotních službách (ZZS), který definuje účel a základní podmínku platnosti dříve vysloveného přání zletilého plně svéprávného pacienta.',
      },
      {
        id: 'doc1-s2',
        text: '„V případě zástavy oběhu v terminálním stádiu mého onkologického onemocnění si nepřeji provádění kardiopulmonální resuscitace ani napojení na umělou plicní ventilaci.“',
        isError: false,
        explanation: 'V POŘÁDKU: Jde o legitimní odmítnutí resuscitace a invazivní ventilace (Do Not Resuscitate / DNR) v terminálním stádiu onemocnění, což je plně v souladu s § 36 odst. 1 ZZS.',
      },
      {
        id: 'doc1-s3',
        text: '„Pokud bych trpěl nesnesitelnými bolestmi, které nepůjde běžnými analgetiky tlumit, žádám, aby mi ošetřující lékař nitrožilně podal smrtící dávku chloridu draselného k rychlému ukončení života.“',
        isError: true,
        errorNumber: 1,
        explanation: 'PRÁVNÍ CHYBA 1/3: Podle § 36 odst. 5 písm. b) ZZS nelze respektovat dříve vyslovené přání, pokud nabádá k takovým postupům, jejichž výsledkem je aktivní způsobení smrti. Aktivní eutanazie je v českém právním řádu protiprávní a lékař ji nesmí provést.',
      },
      {
        id: 'doc1-s4',
        text: '„Toto přání sepisuji doma za přítomnosti své manželky a souseda jako svědků, a proto můj podpis na této listině nemusí být úředně ověřen.“',
        isError: true,
        errorNumber: 2,
        explanation: 'PRÁVNÍ CHYBA 2/3: Podle § 36 odst. 3 ZZS musí být DVP sepsané mimo zdravotnické zařízení opatřeno úředně ověřeným podpisem pacienta. Přítomnost svědků bez úředního ověření postačuje výhradně tehdy, činí-li pacient DVP přímo při přijetí do péče nebo v průběhu hospitalizace záznamem do dokumentace dle § 36 odst. 4 ZZS.',
      },
      {
        id: 'doc1-s5',
        text: '„Prohlašuji, že jsem si veškeré medicínské důsledky nastudoval sám z odborné literatury a písemné poučení lékařem nepotřebuji.“',
        isError: true,
        errorNumber: 3,
        explanation: 'PRÁVNÍ CHYBA 3/3: Podle § 36 odst. 2 ZZS bude DVP bráno v zřetel jen tehdy, je-li jeho obligatorní součástí písemné poučení o důsledcích rozhodnutí provedené registrujícím praktickým lékařem nebo jiným ošetřujícím lékařem v příslušném oboru. Samostudium pacienta zákon nepřipouští.',
      },
    ],
  },
  {
    id: 'doc-2',
    title: 'Zápis o zadržení informace a hospitalizaci',
    documentType: 'Lékařský dekurz a záznam o hospitalizaci',
    totalErrors: 3,
    metaInfo: {
      institution: 'Fakultní nemocnice – Interní klinika, odd. B',
      protocolNo: 'INT-DEK/2026/884',
      date: '17. října 2026',
    },
    sentences: [
      {
        id: 'doc2-s1',
        text: '„Pacientka Marie Černá (72 let) byla dne 14. 10. přijata k plánované hospitalizaci na interním oddělení na základě jí podepsaného písemného informovaného souhlasu s hospitalizací.“',
        isError: false,
        explanation: 'V POŘÁDKU: Písemná forma informovaného souhlasu s hospitalizací je v souladu s kogentním ustanovením § 34 odst. 2 písm. c) zákona o zdravotních službách.',
      },
      {
        id: 'doc2-s2',
        text: '„Vzhledem k tomu, že histologické vyšetření prokázalo zhoubný nádor slinivky a pacientka je psychicky křehká, rozhodl jsem jako ošetřující lékař zcela samostatně bez konzultace s jiným lékařem o zadržení této informace, přičemž přímá žádost pacientky o sdělení pravdivé diagnózy na mém rozhodnutí nic nemění.“',
        isError: true,
        errorNumber: 1,
        explanation: 'PRÁVNÍ CHYBA 1/3: Dvojí porušení § 2640 OZ! Podle § 2640 odst. 1 OZ se má za to, že poskytovatel právo zadržet informaci nemá, nepotvrdí-li mu zjevnost a vážnost nebezpečí jiná osoba poskytující péči v daném oboru (druhý odborník). Podle § 2640 odst. 2 OZ navíc informaci nelze zadržet nikdy, pokud pacient výslovně žádá přesnou a pravdivou informaci.',
      },
      {
        id: 'doc2-s3',
        text: '„Dne 16. 10. ve 23:00 došlo u pacientky k rozvoji těžkého deliria s bezprostředním ohrožením života (pokus o vyskočení z okna), pročež bylo po selhání mírnějších postupů indikováno omezení v pohybu ochrannými pásy.“',
        isError: false,
        explanation: 'V POŘÁDKU: Použití omezovacího prostředku splňuje všechny zákonné podmínky dle § 39 odst. 1 písm. b) a odst. 2 ZZS – odvrácení bezprostředního ohrožení života a zdraví při selhání mírnějších opatření.',
      },
      {
        id: 'doc2-s4',
        text: '„Jelikož pacientka při nástupu do nemocnice dne 14. 10. podepsala písemný souhlas s hospitalizací, nevzniká nemocnici žádná povinnost oznamovat toto třídenní přikurtování a držení na lůžku soudu.“',
        isError: true,
        errorNumber: 2,
        explanation: 'PRÁVNÍ CHYBA 2/3: Podle § 40 odst. 1 písm. b) ZZS je poskytovatel povinen oznámit soudu do 24 hodin i dodatečné omezení dobrovolně přijatého pacienta ve volném pohybu až v průběhu léčení, pokud s tím pacient v této 24hodinové lhůtě nevyslovil souhlas. Původní souhlas s nástupem do nemocnice tuto oznamovací povinnost neruší.',
      },
      {
        id: 'doc2-s5',
        text: '„Žádosti syna pacientky o pořízení první kopie dosavadní zdravotnické dokumentace (na základě plné moci a určení pacientkou) vyhovíme až poté, co na pokladně nemocnice uhradí poplatek 400 Kč za tisk.“',
        isError: true,
        errorNumber: 3,
        explanation: 'PRÁVNÍ CHYBA 3/3: Podle § 66 odst. 3 ZZS a čl. 15 odst. 3 GDPR je první pořízení výpisu nebo kopie zdravotnické dokumentace zcela bezplatné. Úhradu za náklady lze požadovat až při opakované žádosti o tytéž údaje.',
      },
    ],
  },
  {
    id: 'doc-3',
    title: 'Záznam ze specifických zdravotních služeb',
    documentType: 'Protokol centra reprodukční a chirurgické medicíny',
    totalErrors: 3,
    metaInfo: {
      institution: 'Klinické centrum asistované reprodukce a chirurgie',
      protocolNo: 'ZSZS/2026/099-SPEC',
      date: '2. srpna 2026',
    },
    sentences: [
      {
        id: 'doc3-s1',
        text: '„Pacientce Petře K. (34 let, bez partnera) byla na základě její samostatné písemné žádosti provedena asistovaná reprodukce darovanými spermiemi.“',
        isError: true,
        errorNumber: 1,
        explanation: 'PRÁVNÍ CHYBA 1/3: Podle § 3 odst. 2 a § 6 odst. 1 zákona č. 373/2011 Sb. (ZSZS) lze asistovanou reprodukci provést výhradně na základě písemné žádosti neplodného páru tvořeného ženou a mužem. Single ženě bez partnera ji v ČR podle platného práva nelze provést.',
      },
      {
        id: 'doc3-s2',
        text: '„Neplodnému páru bylo sděleno, že identitu anonymního dárce zárodečných buněk jim poskytovatel ze zákona nesmí odhalit.“',
        isError: false,
        explanation: 'V POŘÁDKU: Podle § 10 zákona č. 373/2011 Sb. je poskytovatel ze zákona povinen zachovávat vzájemnou anonymitu dárce a neplodného páru i narozeného dítěte.',
      },
      {
        id: 'doc3-s3',
        text: '„Pacientovi Lukáši M. (19 let, plně svéprávný), který nemá žádné zdravotní obtíže, ale nepřeje si mít v budoucnu děti, byla na jeho žádost provedena sterilizace z jiných než zdravotních důvodů, a to 3 dny po podání informace.“',
        isError: true,
        errorNumber: 2,
        explanation: 'PRÁVNÍ CHYBA 2/3: Dvojí porušení § 13 a § 15 odst. 2 zákona č. 373/2011 Sb.! Sterilizaci z jiných než zdravotních důvodů lze provést pouze osobě starší 21 let (zde 19 let) a lhůta mezi podáním informace a udělením souhlasu bezprostředně před zákrokem musí činit nejméně 14 dnů (zde pouze 3 dny).',
      },
      {
        id: 'doc3-s4',
        text: '„Pacientovi ve výkonu trestu odnětí svobody byla na jeho vlastní písemnou žádost schválena a provedena kastrace kvůli parafilní poruše.“',
        isError: true,
        errorNumber: 3,
        explanation: 'PRÁVNÍ CHYBA 3/3: Podle § 20 zákona č. 373/2011 Sb. platí absolutní zákonný zákaz provést terapeutickou kastraci osobám ve výkonu vazby, ve výkonu trestu odnětí svobody nebo ve výkonu zabezpečovací detence.',
      },
    ],
  },
];
