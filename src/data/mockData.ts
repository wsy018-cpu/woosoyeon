import { BookProduct, Exam, EvaluationResult, JuniorPrompt, MiddlePrompt } from '../types';

export const mockExams: Exam[] = [
  {
    id: "yonsei-2028-04",
    univ: "연세대",
    track: "인문논술",
    month: "4월 (2회차)",
    badgeColor: "bg-blue-900 text-blue-100",
    themeColor: "border-blue-600 text-blue-600",
    bgLight: "bg-blue-50/50",
    question: "제시문 (가)~(다)를 '개인의 자유와 공동체의 책임' 관점에서 비교·분석하시오. (600±60자)",
    timeLimit: 120,
    wordCountMin: 540,
    wordCountMax: 660,
    targetWords: 600,
    status: "응시가능",
    cutlineInfo: {
      avgScore: 78.4,
      competitionRatio: "38.5 : 1",
      minKoreanGrade: "수능 2개합 4 이내"
    },
    materials: {
      examPaper: "연세대_2028_4월_모의논술_문제지.pdf",
      practicePaper: "연세대_논술_연습지(개요작성용).pdf",
      answerSheet: "연세대_정통_원고지_답안지(1200자).pdf",
      modelSolution: "연세대_2회차_출제의도_및_예시답안.pdf"
    },
    englishName: "YONSEI UNIVERSITY",
    campusLocation: "신촌 본교 (백양로)",
    slogan: "진리가 너희를 자유케 하리라 (Veritas Vos Liberabit)",
    symbol: "독수리 (Eagle)",
    emblemEmoji: "🦅",
    brandGradient: "from-[#00173D] via-[#002B66] to-[#0A192F]",
    accentHex: "#00205B",
    essayDna: "인문·사회 융합 다면사고형: 1번 비교분석 + 2번 도표·통계 해석 + 3번 영어/수리 논리 통합 평가",
    professorTrap: "도표의 증감폭만 기계적으로 나열하거나, (가)와 (나)의 대립점을 단순 흑백논리로 이분화할 시 최하위 C등급 부여",
    scoringSecret: "비교 기준을 '인간의 본질 규정'과 '국가 개입의 정당성' 2대 축으로 먼저 선언하고 심층 전개",
    answerSheetFormat: "1,200자 정통 격자 원고지 (문항당 600±60자 2개)",
    passages: [
      {
        id: "p1",
        label: "제시문 (가)",
        title: "소극적 자유와 국가의 한계",
        source: "존 스튜어트 밀, 『자유론』 발췌·재구성",
        content: `인간 사회에서 타인의 자유를 간섭할 수 있는 유일한 근거는 '자기 보호'뿐이다. 문명화된 공동체에서 어떤 구성원의 자유를 그의 의지에 반해 정당하게 억압할 수 있는 유일한 목적은 타인에게 가해지는 해악을 방지하는 것이다. 당사자 자신의 물리적·도덕적 복리를 위한다는 명분이라도 간섭은 정당화될 수 없다. 자신에 대한 그의 독립성은 절대적인 권리이다. 인간은 자신의 몸과 마음에 대해 온전한 주권자이다. 사회가 개인에게 개입하여 특정한 미덕이나 희생을 강제하는 순간, 자유의 진정한 가치는 훼손된다.`
      },
      {
        id: "p2",
        label: "제시문 (나)",
        title: "공동체주의와 상호적 의무",
        source: "마이클 샌델, 『공동체와 정의』 발췌·재구성",
        content: `자유로운 자아란 역사적·사회적 맥락으로부터 완전히 분리된 추상적 주체가 아니다. 우리는 특정한 가족, 이웃, 국가라는 서사적 전통 속에서 자신의 정체성을 발견한다. 따라서 개인의 자유는 공동체에 대한 충성과 연대, 상호 부조의 책무와 분리되어 존재할 수 없다. 만약 개인이 공동체에 대한 책임을 방기한 채 오직 원자화된 권리만을 주장한다면, 공동체의 도덕적 결속력은 와해되고 결국 개인의 자유를 지탱하는 제도적 기반마저 붕괴될 것이다. 진정한 자유는 공동선 실현에 동참할 때 완성된다.`
      },
      {
        id: "p3",
        label: "제시문 (다)",
        title: "사회 계약과 절차적 규범",
        source: "위르겐 하버마스, 『의사소통행위론』 발췌·재구성",
        content: `개인의 자율성과 공동체의 규범적 요구 사이의 갈등은 일방적 희생이나 절대적 자유의 보장으로 해소되지 않는다. 중요한 것은 민주적 공론장에서 이루어지는 합리적 담론의 절차이다. 자유로운 시민들이 동등한 자격으로 토의에 참여하여 도출한 합의만이 상호 간의 구속력을 갖는다. 즉, 권리와 책임은 고정된 대립물이 아니라 지속적인 의사소통을 통해 재구성되는 동태적 규범 체계이다.`
      },
      {
        id: "p4",
        label: "도표 자료 (라)",
        title: "OECD 주요국 시민 자율성 지수 및 사회적 연대감 조사 (2027)",
        source: "사회통계연구원 정책지표 분석",
        content: `아래 도표는 개인의 자율적 선택권 지수(X축)와 위기 시 이웃에 대한 신뢰 및 공동체 분담 의지(Y축)의 상관관계를 나타낸다. 고신뢰 사회일수록 자율성과 사회적 책임감이 선순환을 이루는 양의 상관관계를 보인다.`,
        chartData: [
          { label: "한국 (2024)", valueA: 62, valueB: 54 },
          { label: "한국 (2028 추정)", valueA: 74, valueB: 68 },
          { label: "스웨덴", valueA: 88, valueB: 85 },
          { label: "독일", valueA: 82, valueB: 79 },
          { label: "미국", valueA: 91, valueB: 58 }
        ]
      }
    ],
    sampleModelAnswer: `제시문 (가)는 개인주의적 자유주의의 관점에서 자유를 타인의 간섭이 없는 '소극적 자유'로 규정하며, 공동체의 개입을 타인 위해 방지로 엄격히 제한한다. 반면 제시문 (나)는 공동체주의적 시각에서 개인을 공동체의 서사와 역사에 결합된 존재로 보며, 공동선에 헌신하는 '적극적 책임' 속에서 자유가 완성된다고 주장한다. 한편 제시문 (다)는 양자의 이분법을 넘어, 합리적 공론장에서의 민주적 소통 절차를 통해 자유와 책임이 상호 구성된다는 절차주의적 해법을 제시한다. 종합하면, (가)가 권리의 우선성을, (나)가 의무의 선행성을 강조하는 반면, (다)는 공론장 숙의를 통한 동태적 조화를 모색한다는 점에서 차별화된다.`
  },
  {
    id: "gachon-2028-04",
    univ: "가천대",
    track: "약술형",
    month: "4월 (2회차)",
    badgeColor: "bg-sky-700 text-sky-100",
    themeColor: "border-sky-500 text-sky-500",
    bgLight: "bg-sky-50/50",
    question: "제시문 (가)의 핵심 주장을 한 문장으로 서술하고 근거 2가지를 쓰시오. (200자 내외)",
    timeLimit: 80,
    wordCountMin: 160,
    wordCountMax: 240,
    targetWords: 200,
    status: "응시가능",
    cutlineInfo: {
      avgScore: 84.2,
      competitionRatio: "25.1 : 1",
      minKoreanGrade: "수능 1개 영역 3등급"
    },
    materials: {
      examPaper: "가천대_2028_4월_약술형_문제지.pdf",
      practicePaper: "가천대_약술형_연습지.pdf",
      answerSheet: "가천대_지정줄글_답안지.pdf",
      modelSolution: "가천대_채점기준표_및_모범답안.pdf"
    },
    englishName: "GACHON UNIVERSITY",
    campusLocation: "글로벌(성남) 캠퍼스",
    slogan: "박애 · 봉사 · 애국 (Philanthropy, Service, Patriotism)",
    symbol: "바람개비 (Pinwheel)",
    emblemEmoji: "🌀",
    brandGradient: "from-[#003876] via-[#0072CE] to-sky-950",
    accentHex: "#0072CE",
    essayDna: "수도권 약술형 최대 980명 선발: EBS 수능특강 100% 연계, 80분 단답·1문장·근거형 15문항",
    professorTrap: "지문 외 불필요한 미사여구를 늘어놓거나, 문항에서 요구한 근거 2가지 중 1가지만 서술",
    scoringSecret: "[핵심 주장]과 [근거 1, 2]를 두괄식으로 명확히 구분하여 채점관의 체크리스트에 100% 부합",
    answerSheetFormat: "가천대 지정 칸 줄글 서술형 답안지",
    passages: [
      {
        id: "gp1",
        label: "제시문 (가)",
        title: "생성형 AI 시대의 정보 비판적 수용",
        source: "디지털 리터러시 교육과정 해설서 발췌",
        content: `생성형 인공지능이 제공하는 답변은 방대한 데이터의 확률적 결합일 뿐, 본질적인 진위를 스스로 보증하지 못한다. 따라서 학습자는 AI의 산출물을 맹신하지 않고 1차 원전 출처를 대조 검증하는 '비판적 독해력'을 필수적으로 함양해야 한다. 아울러 다각적인 시각에서 반론을 제기해 보는 능동적 질문 능력이 정보의 편향성을 극복하는 핵심 열쇠가 된다.`
      }
    ],
    sampleModelAnswer: `[핵심 주장] 생성형 AI 산출물은 확률적 조합에 불과하므로 학습자는 비판적 독해력과 능동적 질문 능력을 갖추어야 한다.\n[근거 1] AI 답변은 자체적인 진위 검증 기능이 없으므로 1차 원전 출처와 대조하는 절차가 필수적이기 때문이다.\n[근거 2] 질문을 능동적으로 다각화해야 AI가 가진 데이터 편향성을 교정할 수 있기 때문이다.`
  },
  {
    id: "korea-2028-04",
    univ: "고려대",
    track: "인문논술",
    month: "4월 (2회차)",
    badgeColor: "bg-rose-900 text-rose-100",
    themeColor: "border-rose-700 text-rose-700",
    bgLight: "bg-rose-50/50",
    question: "제시문 (가)와 (나)의 사회계약론적 시각을 비교하고, 이를 토대로 (다)의 디지털 플랫폼 규제 논쟁을 비판적으로 평가하시오. (1,000±100자)",
    timeLimit: 120,
    wordCountMin: 900,
    wordCountMax: 1100,
    targetWords: 1000,
    status: "응시가능",
    cutlineInfo: {
      avgScore: 76.8,
      competitionRatio: "45.2 : 1",
      minKoreanGrade: "수능 4개합 8, 한국사 4"
    },
    materials: {
      examPaper: "고려대_2028_모의논술_문제지.pdf",
      practicePaper: "고려대_논술_구상지.pdf",
      answerSheet: "고려대_공식_원고지_답안지.pdf",
      modelSolution: "고려대_예시답안_및_채점가이드.pdf"
    },
    englishName: "KOREA UNIVERSITY",
    campusLocation: "안암 본교 (석탑 캠퍼스)",
    slogan: "자유·정의·진리 (Libertas, Justitia, Veritas)",
    symbol: "호랑이 (Tiger)",
    emblemEmoji: "🐯",
    brandGradient: "from-[#4A0012] via-[#861F41] to-slate-950",
    accentHex: "#861F41",
    essayDna: "고전 사회철학 심층 비교 및 디지털 자본주의 규제 비판 (수리·논리력 연계 부활)",
    professorTrap: "제시문의 문장을 그대로 인용 복사하거나 비판 대상의 논리적 전제를 파악하지 못한 채 반대만 서술",
    scoringSecret: "홉스의 '공포와 질서'와 로크의 '신탁과 저항권'을 플랫폼 독점 규제의 1:1 대칭 모델로 연결",
    answerSheetFormat: "1,000자 공식 원고지 답안지 (±100자)",
    passages: [
      {
        id: "kp1",
        label: "제시문 (가)",
        title: "홉스의 리바이어던과 질서의 우선성",
        source: "토머스 홉스, 『리바이어던』",
        content: `자연 상태는 '만인에 대한 만인의 투쟁' 상태이며, 생명과 안전을 보장받기 위해 개인들은 자신의 절대적 권리를 단일한 통치 권력에 전면 양도한다. 질서가 없으면 자유 또한 무의미하다.`
      },
      {
        id: "kp2",
        label: "제시문 (나)",
        title: "로크의 신탁과 시민의 저항권",
        source: "존 로크, 『통치론』",
        content: `국가는 개인의 신체와 재산 등 자연권을 수호하기 위해 시민에 의해 신탁된 기구이다. 정부가 국민의 권리를 침해할 때 시민은 정당한 저항권을 행사할 수 있다.`
      },
      {
        id: "kp3",
        label: "제시문 (다)",
        title: "초거대 플랫폼 독점과 알고리즘 알고리즘 주권",
        source: "2027 디지털 사회백서",
        content: `글로벌 플랫폼 독점 기업들이 여론 형성과 경제 생태계를 지배하면서, 국가의 강력한 공적 개입을 요구하는 목소리와 혁신을 위한 자율 규제를 옹호하는 주장이 첨예하게 대립하고 있다.`
      }
    ],
    sampleModelAnswer: `고려대 4월 모의논술은 홉스의 국가 우선주의와 로크의 권리 중심 신탁주의를 대조한 뒤, 플랫폼 규제에 국가가 어디까지 개입할 수 있는지를 법치주의적 시각에서 입증하는 문항입니다.`
  },
  {
    id: "sogang-2028-04",
    univ: "서강대",
    track: "인문논술",
    month: "4월 (2회차)",
    badgeColor: "bg-red-800 text-red-100",
    themeColor: "border-red-700 text-red-700",
    bgLight: "bg-red-50/50",
    question: "제시문 [가]의 '문화적 상대주의' 관점을 바탕으로 [나]의 보편 윤리 딜레마를 분석하고 해결 방향을 제시하시오. (800~1000자)",
    timeLimit: 100,
    wordCountMin: 800,
    wordCountMax: 1000,
    targetWords: 900,
    status: "응시가능",
    cutlineInfo: {
      avgScore: 81.0,
      competitionRatio: "52.4 : 1",
      minKoreanGrade: "수능 3개합 7"
    },
    materials: {
      examPaper: "서강대_모의논술_문제지.pdf",
      practicePaper: "서강대_개요지.pdf",
      answerSheet: "서강대_원고지_답안지.pdf",
      modelSolution: "서강대_우수답안_모음.pdf"
    },
    englishName: "SOGANG UNIVERSITY",
    campusLocation: "신수동 캠퍼스",
    slogan: "그대 서강의 자랑이듯, 서강 그대의 자랑이어라",
    symbol: "알바트로스 (Albatross)",
    emblemEmoji: "🕊️",
    brandGradient: "from-[#4A000A] via-[#9B111E] to-slate-950",
    accentHex: "#9B111E",
    essayDna: "텍스트 밀착형 심층 독해 및 보편 윤리 딜레마 평가 (문항 간 논리적 연계율 95%)",
    professorTrap: "제시문 밖의 어설픈 배경지식으로 지문의 엄밀한 논증을 왜곡하거나 양비론에 빠지는 서술",
    scoringSecret: "극단적 문화상대주의의 한계를 '보편적 인권'의 관점에서 정확한 학술 개념어로 논증",
    answerSheetFormat: "800~1000자 서강 원고지 답안지",
    passages: [
      {
        id: "sp1",
        label: "제시문 [가]",
        title: "문화의 다양성과 내재적 합리성",
        content: `각 사회의 관습과 도덕은 고유한 생태 환경과 역사적 배경 속에서 축적된 지혜이다. 외부의 척도로 열등하거나 미개하다고 재단해서는 안 된다.`
      },
      {
        id: "sp2",
        label: "제시문 [나]",
        title: "기본 인권의 불가침성",
        content: `문화적 특수성이란 이름으로 여성 할례, 명예살인, 아동 노동 등 보편적 인간 존엄성을 침해하는 행위까지 면죄부를 받을 수는 없다.`
      }
    ],
    sampleModelAnswer: `극단적 문화상대주의의 함정을 경계하고, 보편적 인권이라는 최소한의 규범적 한계 내에서 문화적 다양성을 수용하는 상호문화주의적 태도를 제시해야 합니다.`
  },
  {
    id: "skku-2028-04",
    univ: "성균관대",
    track: "인문논술",
    month: "4월 (2회차)",
    badgeColor: "bg-emerald-900 text-emerald-100",
    themeColor: "border-emerald-700 text-emerald-700",
    bgLight: "bg-emerald-50/50",
    question: "[문제 1] <제시문 1>~<제시문 4>는 분배 정의에 관한 두 입장으로 분류된다. 두 입장을 요약·비교하시오.",
    timeLimit: 100,
    wordCountMin: 600,
    wordCountMax: 800,
    targetWords: 700,
    status: "응시가능",
    cutlineInfo: {
      avgScore: 79.5,
      competitionRatio: "41.0 : 1",
      minKoreanGrade: "수능 3개합 6 (글로벌 3개합 5)"
    },
    materials: {
      examPaper: "성균관대_인문1_문제지.pdf",
      practicePaper: "성균관대_연습지.pdf",
      answerSheet: "성균관대_답안지.pdf",
      modelSolution: "성균관대_모범답안.pdf"
    },
    englishName: "SUNGKYUNKWAN UNIVERSITY",
    campusLocation: "혜화·명륜 인문사회과학캠퍼스",
    slogan: "수기치인(修己治人) · 인의예지(仁義禮智)",
    symbol: "은행잎 (Ginkgo)",
    emblemEmoji: "🌿",
    brandGradient: "from-[#002B14] via-[#004C28] to-slate-950",
    accentHex: "#004C28",
    essayDna: "성대 전통의 1번 분류 요약형: 제시문 4개를 상반된 2개 입장으로 칼같이 2:2 분류",
    professorTrap: "제시문 4개 중 1개라도 입장을 오분류하거나 3:1의 불균형 구조로 묶는 순간 1번 문항 0점 과락",
    scoringSecret: "입장 1(롤스: 차등원칙)과 입장 2(노직: 취득의 정당성)의 핵심 쟁점을 단문으로 먼저 정의",
    answerSheetFormat: "700자 성균관 지정 답안지",
    passages: [
      {
        id: "skp1",
        label: "<제시문 1>",
        content: `롤스의 차등 원칙: 사회적·경제적 불평등은 최소 수혜자에게 최대의 이익을 보장할 때에만 정당화된다.`
      },
      {
        id: "skp2",
        label: "<제시문 2>",
        content: `노직의 권리부여론: 취득과 이전의 과정이 정당하다면 결과로서의 불평등에 국가가 재분배 개입을 해서는 안 된다.`
      }
    ],
    sampleModelAnswer: `입장 1(롤스-결과적 평등 및 최소수혜자 배려)과 입장 2(노직-절차적 정당성 및 소유권 절대성)로 정확히 2:2 분류하여 요약해야 합니다.`
  },
  {
    id: "hanyang-2028-04",
    univ: "한양대",
    track: "인문논술",
    month: "4월 (2회차)",
    badgeColor: "bg-amber-900 text-amber-100",
    themeColor: "border-amber-600 text-amber-600",
    bgLight: "bg-amber-50/50",
    question: "(가)의 관점을 토대로 (나)의 사회적 현상을 비판하고 대안을 논술하시오. (1200자)",
    timeLimit: 90,
    wordCountMin: 1100,
    wordCountMax: 1300,
    targetWords: 1200,
    status: "응시가능",
    cutlineInfo: {
      avgScore: 82.3,
      competitionRatio: "88.2 : 1 (수능최저 없음)",
      minKoreanGrade: "수능 최저학력기준 없음"
    },
    materials: {
      examPaper: "한양대_상경_인문_문제지.pdf",
      practicePaper: "한양대_연습지.pdf",
      answerSheet: "한양대_원고지.pdf",
      modelSolution: "한양대_출제의도.pdf"
    },
    englishName: "HANYANG UNIVERSITY",
    campusLocation: "왕십리·행당 캠퍼스",
    slogan: "사랑의 실천 (Love in Deed and Truth)",
    symbol: "사자 (Lion)",
    emblemEmoji: "🦁",
    brandGradient: "from-[#071938] via-[#0E2B5C] to-slate-950",
    accentHex: "#0E2B5C",
    essayDna: "수능최저 전면 폐지 순수 논술 100% 선발 (경쟁률 88:1, 파괴적이고 심층적인 대안 추론형)",
    professorTrap: "누구나 쓰는 원론적이고 뻔한 대안('인식 개선', '법률 개정')으로 끝맺는 무기력한 서술",
    scoringSecret: "아도르노의 도구적 이성 비판을 플랫폼 노동의 알고리즘 감시 메커니즘과 직결해 독창적 해법 도출",
    answerSheetFormat: "1,200자 한양 원고지",
    passages: [
      {
        id: "hp1",
        label: "(가)",
        content: `도구적 이성의 팽배와 인간 소외: 효율성과 물질적 이익만을 쫓는 근대 산업 합리성은 인간을 시스템의 부품으로 전락시켰다.`
      },
      {
        id: "hp2",
        label: "(나)",
        content: `빅데이터 감시 자본주의와 플랫폼 노동: 초단기 계약과 평점 알고리즘으로 통제되는 현대 노동 현장의 현실.`
      }
    ],
    sampleModelAnswer: `한양대는 최저 기준이 없는 만큼 논리적 깊이와 문장 완성도가 당락을 결정합니다. 아도르노/호르크하이머의 비판이론을 적용해 플랫폼 알고리즘을 분석합니다.`
  },
  {
    id: "cau-2028-04",
    univ: "중앙대",
    track: "인문논술",
    month: "4월 (2회차)",
    badgeColor: "bg-indigo-900 text-indigo-100",
    themeColor: "border-indigo-600 text-indigo-600",
    bgLight: "bg-indigo-50/50",
    question: "제시문 (가)~(라)에서 공통으로 다루는 중심 화제를 제시하고, 각 제시문의 논지를 하나의 완성된 글로 논술하시오. (550~570자)",
    timeLimit: 120,
    wordCountMin: 500,
    wordCountMax: 600,
    targetWords: 560,
    status: "응시가능",
    cutlineInfo: {
      avgScore: 77.1,
      competitionRatio: "49.0 : 1",
      minKoreanGrade: "수능 3개합 6 (인문)"
    },
    materials: {
      examPaper: "중앙대_인문1_문제지.pdf",
      practicePaper: "중앙대_연습지.pdf",
      answerSheet: "중앙대_지정원고지.pdf",
      modelSolution: "중앙대_해설집.pdf"
    },
    englishName: "CHUNG-ANG UNIVERSITY",
    campusLocation: "흑석 캠퍼스",
    slogan: "의에 죽고 참에 살자 (Live in Truth, Live for Justice)",
    symbol: "청룡 (Blue Dragon)",
    emblemEmoji: "🐉",
    brandGradient: "from-[#002447] via-[#00458C] to-slate-950",
    accentHex: "#00458C",
    essayDna: "중앙대 인문1 시그니처: '하나의 완성된 글(서-본-결)' 550자 단일 단락 작성 조건",
    professorTrap: "단락을 줄바꿈하거나, 4개 제시문 중 하나라도 논지를 누락하거나 자수 570자 초과 시 폭풍 감점",
    scoringSecret: "서론 1문장(공통 화제), 본론 3문장(각 지문 대조), 결론 1문장(종합)의 550자 칼박자 템플릿",
    answerSheetFormat: "550~570자 단일 단락 원고지",
    passages: [
      {
        id: "cp1",
        label: "제시문 (가)",
        content: `공감 능력의 결여와 사이코패시 현상에 관한 신경인지과학적 고찰.`
      }
    ],
    sampleModelAnswer: `중앙대 인문1의 특징인 '하나의 완성된 글' 조건(서론/본론/결론의 유기적 구성)을 정확히 지켜야 감점을 피할 수 있습니다.`
  },
  {
    id: "khu-2028-04",
    univ: "경희대",
    track: "인문논술",
    month: "4월 (2회차)",
    badgeColor: "bg-rose-950 text-rose-200",
    themeColor: "border-rose-800 text-rose-800",
    bgLight: "bg-rose-50/40",
    question: "[논제 I] 제시문 [가]와 [나]를 비교하고, [다]의 화자의 태도를 [가]의 관점에서 평가하시오. (600~700자)",
    timeLimit: 120,
    wordCountMin: 600,
    wordCountMax: 700,
    targetWords: 650,
    status: "응시가능",
    cutlineInfo: {
      avgScore: 80.2,
      competitionRatio: "56.8 : 1",
      minKoreanGrade: "수능 2개합 5 (인문)"
    },
    materials: {
      examPaper: "경희대_인문_문제지.pdf",
      practicePaper: "경희대_연습지.pdf",
      answerSheet: "경희대_원고지.pdf",
      modelSolution: "경희대_모범답안.pdf"
    },
    englishName: "KYUNG HEE UNIVERSITY",
    campusLocation: "회기 캠퍼스 (평화의 전당)",
    slogan: "문화세계의 창조 (Towards a New Civilization)",
    symbol: "목련 & 사자 (Magnolia)",
    emblemEmoji: "🌸",
    brandGradient: "from-[#400000] via-[#800000] to-slate-950",
    accentHex: "#800000",
    essayDna: "인문·예술 융합 문학 제시문 비판형: 시·소설 속 화자의 정서와 철학 텍스트의 상호 텍스트성",
    professorTrap: "문학 작품의 상징적 메타포를 문자 그대로 해석하거나, 인문학적 가치 평가를 누락하는 실수",
    scoringSecret: "문학 작품의 화자가 지닌 생태적 감수성을 철학 지문의 '생태 중심주의'와 일치시켜 다층 평가",
    answerSheetFormat: "600~700자 경희 원고지",
    passages: [
      {
        id: "khp1",
        label: "[가]",
        content: `생태 중심주의: 인간은 자연의 지배자가 아니라 생태계 그물망의 한 부분에 불과하다.`
      }
    ],
    sampleModelAnswer: `문학 작품과 철학 텍스트의 상호 연결성을 파악하여 입체적인 비판을 전개해야 합니다.`
  }
];

export const all30Universities = [
  { id: "yonsei", name: "연세대", track: "인문논술", quota: 351, minScore: "2개합 4", color: "blue", tierCategory: "SKY", emblemEmoji: "🦅", campus: "신촌 본교", slogan: "진리가 너희를 자유케 하리라" },
  { id: "korea", name: "고려대", track: "인문논술", quota: 360, minScore: "4개합 8", color: "rose", tierCategory: "SKY", emblemEmoji: "🐯", campus: "안암 본교", slogan: "자유·정의·진리" },
  { id: "sogang", name: "서강대", track: "인문논술", quota: 175, minScore: "3개합 7", color: "red", tierCategory: "서성한", emblemEmoji: "🕊️", campus: "신수동", slogan: "그대 서강의 자랑이듯 서강 그대의 자랑이어라" },
  { id: "skku", name: "성균관대", track: "인문논술", quota: 380, minScore: "3개합 6", color: "emerald", tierCategory: "서성한", emblemEmoji: "🌿", campus: "명륜 인문캠", slogan: "수기치인(修己治人) · 인의예지" },
  { id: "hanyang", name: "한양대", track: "인문논술", quota: 246, minScore: "최저 없음", color: "amber", tierCategory: "서성한", emblemEmoji: "🦁", campus: "왕십리 본교", slogan: "사랑의 실천 (논술 100%)" },
  { id: "cau", name: "중앙대", track: "인문논술", quota: 420, minScore: "3개합 6", color: "indigo", tierCategory: "중경외시", emblemEmoji: "🐉", campus: "흑석 본교", slogan: "의에 죽고 참에 살자" },
  { id: "khu", name: "경희대", track: "인문논술", quota: 460, minScore: "2개합 5", color: "rose", tierCategory: "중경외시", emblemEmoji: "🌸", campus: "회기 본교", slogan: "문화세계의 창조" },
  { id: "hufs", name: "한국외대", track: "인문논술", quota: 309, minScore: "2개합 4", color: "cyan", tierCategory: "중경외시", emblemEmoji: "🌐", campus: "이문동 본교", slogan: "내 꿈을 세계로" },
  { id: "uos", name: "서울시립대", track: "인문논술", quota: 77, minScore: "최저 없음", color: "sky", tierCategory: "중경외시", emblemEmoji: "🏛️", campus: "전농동 본교", slogan: "서울과 함께 도약하는 지성" },
  { id: "ewha", name: "이화여대", track: "인문논술", quota: 310, minScore: "3개합 6", color: "teal", tierCategory: "여대", emblemEmoji: "🍐", campus: "신촌 본교", slogan: "세상을 바꾸는 부드러운 힘" },
  { id: "sookmyung", name: "숙명여대", track: "인문논술", quota: 217, minScore: "2개합 5", color: "blue", tierCategory: "여대", emblemEmoji: "❄️", campus: "청파동 본교", slogan: "세상을 바꾸는 여성 리더십" },
  { id: "dongguk", name: "동국대", track: "인문논술", quota: 290, minScore: "2개합 5", color: "orange", tierCategory: "주요대", emblemEmoji: "🐘", campus: "필동 본교", slogan: "세상을 밝히는 연꽃의 지혜" },
  { id: "konkuk", name: "건국대", track: "인문논술", quota: 435, minScore: "2개합 5", color: "green", tierCategory: "주요대", emblemEmoji: "🐂", campus: "일감호 본교", slogan: "성(誠)·신(信)·의(義)" },
  { id: "hongik", name: "홍익대", track: "인문논술", quota: 384, minScore: "3개합 8", color: "blue", tierCategory: "주요대", emblemEmoji: "🎨", campus: "상수동 본교", slogan: "홍익인간 산학일체" },
  { id: "kookmin", name: "국민대", track: "인문논술", quota: 205, minScore: "2개합 6", color: "emerald", tierCategory: "주요대", emblemEmoji: "🌳", campus: "정릉 본교", slogan: "이본(以本) 창업정신" },
  { id: "ssu", name: "숭실대", track: "인문논술", quota: 260, minScore: "2개합 5", color: "cyan", tierCategory: "주요대", emblemEmoji: "🐎", campus: "상도동 본교", slogan: "진리와 봉사" },
  { id: "sejong", name: "세종대", track: "인문논술", quota: 310, minScore: "2개합 5", color: "red", tierCategory: "주요대", emblemEmoji: "👑", campus: "군자동 본교", slogan: "창조와 혁신" },
  { id: "dankook", name: "단국대(죽전)", track: "인문논술", quota: 280, minScore: "2개합 6", color: "blue", tierCategory: "주요대", emblemEmoji: "🐻", campus: "죽전 캠퍼스", slogan: "구국·자주·자립" },
  { id: "ajou", name: "아주대", track: "인문논술", quota: 158, minScore: "최저 없음", color: "blue", tierCategory: "주요대", emblemEmoji: "횃", campus: "수원 본교", slogan: "세계를 향한 아주 큰 꿈" },
  { id: "inha", name: "인하대", track: "인문논술", quota: 450, minScore: "최저 없음", color: "sky", tierCategory: "주요대", emblemEmoji: "🐲", campus: "인천 용현캠", slogan: "진(眞)을 향한 탐구" },
  { id: "gachon", name: "가천대", track: "약술형", quota: 980, minScore: "1개 3등급", color: "sky", tierCategory: "수도권약술형", emblemEmoji: "🌀", campus: "성남 글로벌캠", slogan: "박애·봉사·애국 (수도권 최대 약술형)" },
  { id: "samkook", name: "삼육대", track: "약술형", quota: 230, minScore: "1개 3등급", color: "emerald", tierCategory: "수도권약술형", emblemEmoji: "🕊️", campus: "공릉동 본교", slogan: "사람을 변화시키는 교육" },
  { id: "seokyeong", name: "서경대", track: "약술형", quota: 210, minScore: "최저 없음", color: "violet", tierCategory: "수도권약술형", emblemEmoji: "☀️", campus: "정릉 캠퍼스", slogan: "실용과 창의 지성" },
  { id: "hansung", name: "한성대", track: "약술형", quota: 380, minScore: "2개합 7", color: "cyan", tierCategory: "수도권약술형", emblemEmoji: "🐢", campus: "삼선동 본교", slogan: "진리·지선" },
  { id: "suwon", name: "수원대", track: "약술형", quota: 450, minScore: "1개 4등급", color: "indigo", tierCategory: "수도권약술형", emblemEmoji: "⛰️", campus: "화성 본교", slogan: "신뢰와 창의" },
  { id: "koreasj", name: "고려대(세종)", track: "약술형", quota: 360, minScore: "1개 3등급", color: "rose", tierCategory: "수도권약술형", emblemEmoji: "🐯", campus: "세종 캠퍼스", slogan: "공감과 미래 혁신" },
  { id: "sangmyung", name: "상명대", track: "약술형", quota: 190, minScore: "2개합 7", color: "blue", tierCategory: "수도권약술형", emblemEmoji: "🦌", campus: "천안 캠퍼스", slogan: "감성과 지성의 조화" },
  { id: "eulji", name: "을지대", track: "약술형", quota: 180, minScore: "1개 3등급", color: "green", tierCategory: "수도권약술형", emblemEmoji: "🏥", campus: "성남/의정부캠", slogan: "인간 사랑, 생명 존중" },
  { id: "shinhan", name: "신한대", track: "약술형", quota: 140, minScore: "최저 없음", color: "amber", tierCategory: "수도권약술형", emblemEmoji: "🦅", campus: "의정부 본교", slogan: "미래를 여는 기독교 대학" },
  { id: "kyonggi", name: "경기대", track: "인문논술", quota: 170, minScore: "최저 없음", color: "teal", tierCategory: "주요대", emblemEmoji: "🌊", campus: "수원/서울캠", slogan: "진·성·애" }
];

export const mockDefaultEvaluation: EvaluationResult = {
  examId: "yonsei-2028-04",
  univName: "연세대 인문논술 4월 (2회차)",
  submittedAt: "2028-04-18 16:42:15",
  score: 72,
  averageScore: 64,
  percentile: 79,
  submittedAnswer: `제시문 (가)는 자유를 간섭의 부재로 정의하며 공동체의 개입을 경계한다. 개인의 몸과 마음에 대한 주권은 온전히 자신에게 속하므로, 타인에게 피해를 주지 않는 한 국가는 개인의 선택에 개입할 수 없다. 반면 제시문 (나)는 개인을 공동체와 분리될 수 없는 서사적 존재로 파악한다. 개인은 공동체 속에서 비로소 정체성을 얻으며, 공동선에 참여하는 의무를 다할 때 진정한 자유를 누릴 수 있다. 두 제시문은 결국 같은 이야기를 하고 있다. 한편 제시문 (다)는 공론장에서의 민주적 소통을 통해 자유와 책임을 조화시키는 절차적 해결책을 제안한다. 개인의 자율성과 공동체의 규범은 고정된 것이 아니라 합리적 합의 과정을 거쳐 재구성된다. 따라서 자유와 책임은 대립 관계가 아니라 상호보완적이다.`,
  wordCount: 588,
  wordCountTarget: "600±60자 (충족)",
  breakdown: [
    {
      label: "논제 이해",
      score: 17,
      max: 25,
      criteria: "개인의 자유와 공동체의 책임이라는 핵심 축을 명확히 대조하였는가",
      feedback: "자유와 책임의 상충 지점을 짚었으나, 공론장 숙의 절차가 갖는 함의를 심도 있게 부각하지 못했습니다."
    },
    {
      label: "제시문 분석",
      score: 18,
      max: 25,
      criteria: "제시문 (가), (나), (다)의 핵심 논지와 상호 관계를 정확하게 독해하였는가",
      feedback: "밀의 소극적 자유와 샌델의 공동체주의를 적절히 요약했으나, 관계 설정에서 치명적인 논리적 비약이 나타납니다."
    },
    {
      label: "논리 전개",
      score: 21,
      max: 25,
      criteria: "주장 간의 논리적 일관성과 단락 간 유기적 연결성이 우수한가",
      feedback: "서술 순서가 자연스럽고 글의 구성이 체계적입니다. 감점 요인을 보완하면 상위 5% 도약이 가능합니다."
    },
    {
      label: "표현 및 분량",
      score: 16,
      max: 25,
      criteria: "원고지 맞춤법, 띄어쓰기, 정확한 어휘 선택 및 600±60자 준수",
      feedback: "총 588자로 규정 자수를 잘 지켰으나, 상투적 종결 어미와 불명확한 지시대명사 사용이 일부 발견되었습니다."
    }
  ],
  generalComment: "개념 정의는 정확하지만 제시문 간의 관계 파악에서 감점이 있었습니다. 비교 기준을 먼저 명확히 제시한 후 재작성해 보세요. (가)의 '자유 지상'과 (나)의 '공동선 우선'은 결코 같은 주장이 아닙니다.",
  revisionTips: [
    "1. 본론 도입부에서 '자유를 규정하는 방식'과 '국가 개입의 정당성 기준'이라는 2가지 비교 축을 먼저 선언하세요.",
    "2. '두 제시문은 결국 같은 이야기를 하고 있다'는 명백한 오독이므로, (가)는 소극적 자유, (나)는 유기적 책임으로 명확한 대립각을 세우세요.",
    "3. (다)를 절차주의적 종합으로 배치하여 변증법적 결론을 완성하세요."
  ],
  highlightedText: [
    {
      id: "h1",
      text: "제시문 (가)는 자유를 간섭의 부재로 정의하며 공동체의 개입을 경계한다.",
      status: "good",
      tag: "개념 정의 우수",
      comment: "밀의 '소극적 자유'의 본질(간섭의 부재, 불가침의 주권)을 단문으로 정확하고 명쾌하게 압축 정의했습니다.",
      suggestion: "현행 서술 유지 권장"
    },
    {
      id: "h2",
      text: "두 제시문은 결국 같은 이야기를 하고 있다.",
      status: "error",
      tag: "핵심 논리 오류 / 오독",
      comment: "(가)와 (나)의 본질적 차이를 간과한 심각한 오류입니다. (가)는 권리의 우선성을, (나)는 도덕적 공동선의 우선성을 주장하므로 상호 긴장 관계를 밝혀야 합니다.",
      suggestion: "수정 제안: '이처럼 (가)가 권리의 우선성을 강조하는 반면, (나)는 도덕적 공동선의 선행성을 역설하며 뚜렷한 대립을 보인다.'"
    },
    {
      id: "h3",
      text: "개인의 자율성과 공동체의 규범은 고정된 것이 아니라 합리적 합의 과정을 거쳐 재구성된다.",
      status: "good",
      tag: "심화 분석 우수",
      comment: "하버마스의 의사소통적 합리성과 절차적 담론 윤리의 핵심을 훌륭하게 포착하여 글의 종합도를 높였습니다.",
      suggestion: "우수한 문장이므로 결론부의 강조 논거로 유지하십시오."
    }
  ],
  remainingRevisions: 1,
  revisionHistory: [
    {
      version: 1,
      score: 72,
      submittedAt: "2028-04-18 16:42:15",
      diffSummary: "초안 제출 완료 (72점)"
    }
  ]
};

export const initialBookProducts: BookProduct[] = [
  {
    id: "book-concept-01",
    title: "2028 인문논술 완성 개념서",
    subtitle: "논제 분석의 6대 프레임워크와 실전 독해법",
    category: "개념서",
    price: 30000,
    originalPrice: 35000,
    discountRate: 14,
    stock: 12,
    coverColor: "from-blue-900 to-slate-900",
    tag: "베스트셀러",
    features: [
      "2028 개편 수능·내신 연계 출제 매트릭스",
      "상위 15개 대학 기출 유형별 원고지 풀이집",
      "출제의도 간파 훈련 워크북 10회분 수록"
    ],
    description: "인문논술을 처음 시작하거나 논리적 글쓰기의 기본 체계를 잡고자 하는 수험생을 위한 바이블 개념서입니다."
  },
  {
    id: "book-bg-social",
    title: "필수 배경지식 1권 : 사회·미디어",
    subtitle: "알고리즘 민주주의, 인구위기, 공공성 테마",
    category: "배경지식",
    price: 20000,
    stock: 5,
    coverColor: "from-sky-800 to-indigo-950",
    tag: "핵심 테마",
    features: [
      "최신 시사 이슈 20개 심층 해설",
      "사회 교과서 핵심 개념어 마인드맵",
      "대학별 예상 논제 30선"
    ],
    description: "사회학적 시각에서 개인과 집단, 미디어와 권력의 메커니즘을 입체적으로 다루는 배경지식 교재입니다."
  },
  {
    id: "book-bg-econ",
    title: "필수 배경지식 2권 : 경제·글로벌",
    subtitle: "시장 실패, 복지 국가, 플랫폼 자본주의",
    category: "배경지식",
    price: 20000,
    stock: 1,
    coverColor: "from-emerald-900 to-slate-900",
    tag: "품절 임박",
    features: [
      "기본 소득 및 조세 정책 논쟁 정리",
      "경제 지문 그래프/도표 해석 공식 12선",
      "상경계열 수리논술 기초 연계 수록"
    ],
    description: "논술 시험에서 가장 오답률이 높은 경제 메커니즘과 통계 자료 해석의 기초를 탄탄히 다집니다."
  },
  {
    id: "book-bg-philo",
    title: "필수 배경지식 3권 : 철학·인식론",
    subtitle: "자유주의 vs 공동체주의, AI와 인간의 조건",
    category: "배경지식",
    price: 20000,
    stock: 0,
    isSoldOut: true,
    coverColor: "from-purple-950 to-slate-950",
    tag: "일시 품절",
    features: [
      "서양 고전 철학자 15인 논쟁 지도",
      "포스트휴머니즘 윤리 쟁점 총망라",
      "명문대 최다 빈출 철학 제시문 완벽 분석"
    ],
    description: "연세대, 고려대, 서강대 등 최상위권 인문논술의 승부처가 되는 철학적 사유의 힘을 길러줍니다."
  },
  {
    id: "book-bg-history",
    title: "필수 배경지식 4권 : 역사·문명",
    subtitle: "문명의 충돌, 식민주의, 세계화의 명암",
    category: "배경지식",
    price: 20000,
    stock: 8,
    coverColor: "from-amber-900 to-slate-900",
    features: [
      "역사 속 격변기 사상적 논쟁사",
      "역사 왜곡 및 기억의 정치학",
      "통시적 비교 분석 프레임워크"
    ],
    description: "과거와 현재의 끊임없는 대화로서의 역사를 통해 논제에 깊이 있는 통찰을 불어넣습니다."
  },
  {
    id: "book-bg-set",
    title: "배경지식 4권 완벽 마스터 세트",
    subtitle: "사회 + 경제 + 철학 + 역사 (10% 특별 할인)",
    category: "배경지식",
    price: 72000,
    originalPrice: 80000,
    discountRate: 10,
    stock: 4,
    coverColor: "from-indigo-900 via-purple-900 to-slate-900",
    tag: "10% 패키지 할인",
    features: [
      "배경지식 4권 전권 세트 (사회/경제/철학/역사)",
      "특별 부록: 대학별 배경지식 인덱스 북마크",
      "모의고사 1회 무료 체험 쿠폰 동봉"
    ],
    description: "논술 빈출 4대 영역을 한 권으로 끝내는 수험생 필수 배경지식 풀세트입니다."
  },
  {
    id: "book-gachon-ko",
    title: "약술형 국어·서술형 실전 트레이닝",
    subtitle: "가천대·삼육대·서경대 80분 단기완성",
    category: "약술형",
    price: 20000,
    stock: 15,
    coverColor: "from-sky-700 to-cyan-900",
    tag: "약술형 베스트",
    features: [
      "EBS 수능특강/완성 연계 지문 100% 반영",
      "단답형/1문장/근거형 빈출 유형 40제",
      "부분 점수 감점 방지 채점 기준표 수록"
    ],
    description: "수도권 약술형 논술의 출제 패턴을 완벽 분석하여 단기간에 고득점을 달성하는 맞춤 실전서입니다."
  },
  {
    id: "book-chart-essay",
    title: "도표·통계자료 논술의 정석",
    subtitle: "증감 추세선, 교차 분석, 상관관계 서술법",
    category: "도표",
    price: 25000,
    stock: 7,
    coverColor: "from-teal-800 to-slate-900",
    tag: "상경/사회 필수",
    features: [
      "도표 제시문 3단계 해석 공식",
      "수치 인용 및 이상치(Outlier) 비판 서술법",
      "연세·성균관·중앙대 실전 도표 문항 25제"
    ],
    description: "눈에 보이는 수치를 넘어 데이터 이면의 인과관계를 통찰하는 도표 논술 전문 교재입니다."
  },
  {
    id: "book-starter-pack",
    title: "2028 논술 입문 올인원 패키지",
    subtitle: "교재 5종 + 전문 첨삭권 1회 + 전용 필기구",
    category: "패키지",
    price: 110000,
    originalPrice: 145000,
    discountRate: 24,
    stock: 9,
    coverColor: "from-blue-950 via-slate-900 to-amber-950",
    tag: "최고 인기 패키지",
    features: [
      "개념서 1권 + 배경지식 4권 (총 5권)",
      "논술캐스트 3분할 AI+전문가 첨삭 1회권 (3만원 상당)",
      "원고지 전용 답안 패드 (100매) 및 교정펜 증정"
    ],
    description: "논술을 시작하는 수험생이 필요한 모든 교재와 첨삭 혜택을 파격적인 할인 혜택으로 만나는 패키지입니다."
  }
];

export const juniorPrompts: JuniorPrompt[] = [
  {
    id: "jr-1",
    title: "흥부와 놀부 이야기 다시 쓰기",
    category: "독서 감상",
    difficulty: "기초",
    guidingQuestions: [
      {
        id: "q1",
        label: "생각 열기",
        question: "만약 내가 제비였다면, 박 씨를 물어다 줄 때 어떤 마음이었을까요?",
        hint: "은혜를 갚고 싶은 마음이나 놀부의 욕심을 경계하는 마음을 떠올려보세요.",
        placeholder: "제비는 흥부 아저씨의 따뜻한 손길을 잊지 못해서..."
      },
      {
        id: "q2",
        label: "마음 표현",
        question: "놀부의 행동을 보고 배운 점이나 느낀 점은 무엇인가요?",
        hint: "욕심을 지나치게 부리면 어떤 결과가 생길지 생각해봐요.",
        placeholder: "놀부처럼 다른 사람의 것을 빼앗으려 하면 결국..."
      },
      {
        id: "q3",
        label: "나의 다짐",
        question: "앞으로 친구나 가족과 함께 나눔을 실천할 수 있는 한 가지 방법은 무엇일까요?",
        hint: "장난감을 나누어 쓰거나 맛있는 간식을 나누는 작은 일부터 써보세요.",
        placeholder: "앞으로 나는 친구가 도움이 필요할 때 먼저..."
      }
    ]
  },
  {
    id: "jr-2",
    title: "10년 뒤 나에게 보내는 타임캡슐 편지",
    category: "상상 글짓기",
    difficulty: "도전",
    guidingQuestions: [
      {
        id: "q1",
        label: "꿈 탐색",
        question: "10년 뒤 20대 또는 멋진 어른이 된 나는 어떤 일을 하고 있을까요?",
        hint: "좋아하는 일과 사람들에게 도움을 주는 모습을 상상해봐요.",
        placeholder: "10년 뒤 나는 사람들의 마음을 따뜻하게 해주는..."
      },
      {
        id: "q2",
        label: "오늘의 나",
        question: "지금의 내가 가장 좋아하는 것과 소중하게 생각하는 추억은 무엇인가요?",
        hint: "친구와의 즐거웠던 기억이나 취미를 적어보세요.",
        placeholder: "지금 2028년의 나는 방과 후에..."
      },
      {
        id: "q3",
        label: "응원의 한마디",
        question: "미래의 나에게 힘을 북돋워 줄 따뜻한 응원의 말을 남겨보세요.",
        hint: "포기하지 않고 씩씩하게 걸어가라는 격려를 담아봐요.",
        placeholder: "힘든 일이 있어도 언제나 너의 꿈을 믿고..."
      }
    ]
  }
];

export const middlePrompts: MiddlePrompt[] = [
  {
    id: "mid-1",
    subject: "사회",
    grade: "중2",
    title: "민주주의 국가에서 '기본권'의 제한과 그 헌법적 한계",
    question: "국가 안전보장이나 공공복리를 위해 국민의 '기본권'을 제한할 때 지켜야 할 헌법적 원칙을 서술하시오.",
    context: "헌법 제37조 제2항: 국민의 모든 자유와 권리는 국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에 한하여 법률로써 제한할 수 있으며, 제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다.",
    requiredKeywords: ["기본권", "법률", "비례의 원칙", "본질적 내용"],
    minCharCount: 150,
    sampleAnswer: "국민의 기본권을 제한할 때는 반드시 국회에서 제정한 '법률'에 근거해야 하며, 국가안전보장과 질서유지, 공공복리라는 정당한 목적이 있어야 합니다. 또한 필요한 최소한에 그쳐야 한다는 '비례의 원칙'(과잉금지의 원칙)을 준수해야 하고, 어떠한 경우에도 기본권의 '본질적 내용'을 침해할 수 없습니다."
  },
  {
    id: "mid-2",
    subject: "사회",
    grade: "중3",
    title: "국회의원 선거 제도와 '비례대표제'의 의의",
    question: "소선거구제의 한계인 '사표(死票)' 문제를 극복하기 위해 도입된 '비례대표제'의 장점과 원리를 설명하시오.",
    context: "선거는 국민의 의사를 대의제 민주주의에 투영하는 핵심 절차입니다. 정당 득표율과 의석 비율의 불일치는 민주적 정당성을 약화시킬 수 있습니다.",
    requiredKeywords: ["비례대표제", "사표", "정당 득표율", "다양성"],
    minCharCount: 150,
    sampleAnswer: "소선거구제에서는 1등 후보 외의 표가 모두 '사표'가 되는 문제가 발생합니다. 이에 반해 '비례대표제'는 유권자가 지지한 '정당 득표율'에 비례하여 의석을 배분함으로써 사표를 줄이고, 소수 집단과 다양한 계층의 목소리가 국회에 반영되는 '다양성'을 증진시키는 장점이 있습니다."
  },
  {
    id: "mid-3",
    subject: "국어",
    grade: "중2",
    title: "주장과 근거의 타당성 평가 (설득하는 글쓰기)",
    question: "학교 내 스마트폰 사용 제한 논쟁에 대해 찬성 또는 반대 입장을 정하고, 타당한 근거 2가지를 갖추어 논술하시오.",
    context: "타당한 주장이 되기 위해서는 주장이 논제와 직결되어야 하며, 제시된 근거가 신뢰할 수 있고 충분해야 합니다.",
    requiredKeywords: ["타당성", "수업 집중", "자율성", "근거"],
    minCharCount: 150,
    sampleAnswer: "학교 내 스마트폰 사용 제한은 학습권 보장 측면에서 높은 '타당성'을 지닙니다. 첫째 '수업 집중'도를 향상시키고 유해 콘텐츠 노출을 예방할 수 있다는 '근거'가 있습니다. 둘째, 학생들의 '자율성'도 중요하지만 교육 현장의 기본 질서 유지가 우선되어야 하기 때문입니다."
  }
];
