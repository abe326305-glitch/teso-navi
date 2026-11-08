// ============================================================
// 本格姓名判断 ＆ 生年月日総合天命解析エンジン
// （五格剖象法・三才配置・81数理・九星気学・数秘術・西洋星座・手相エレメント判定）
// ============================================================

// 81数理データベース
const NUM_81_DATA = {
  1: { rank: '特大吉', type: '大吉', score: 98, name: '太極開祖・万物始動', desc: 'すべての始まりを司る至高の開祖数。強力な指導力、独立心、無限の可能性を秘め、ゼロから偉業を成し遂げる強運数です。' },
  2: { rank: '注意', type: '凶', score: 55, name: '混沌分裂・協調重視', desc: '繊細で思いやりが深い反面、迷いや優柔不断が生じやすい数。他者とのパートナーシップを大切にし、縁の下の力持ちとして力を発揮します。' },
  3: { rank: '大吉', type: '大吉', score: 92, name: '陽光開花・知恵才気', desc: '太陽の光を浴びて花開くような陽気さと才知の数。直感力、表現力、社交性に恵まれ、明るい人柄で周囲を引き立てて成功します。' },
  4: { rank: '注意', type: '凶', score: 50, name: '未完待機・着実忍耐', desc: '逆境をバネにする忍耐の数。急激な冒険を避け、専門技術やニッチな分野で一歩ずつ確実に足場を固めることで才能が開花します。' },
  5: { rank: '大吉', type: '大吉', score: 95, name: '福徳円満・長寿繁栄', desc: '温厚篤実で人望を集め、バランス感覚に優れた大吉数。健康・財運・家庭のすべてが調和し、着実に大業を成就させます。' },
  6: { rank: '大吉', type: '大吉', score: 92, name: '天恵富貴・安泰成就', desc: '天からの恵みと祖先の加護に恵まれる吉祥数。誠実な人柄で信頼を集め、物質的にも精神的にも豊かな生涯を築きます。' },
  7: { rank: '吉', type: '吉', score: 82, name: '剛毅果断・独創貫徹', desc: '鋭い意志と独立心を持つ職人・開拓者の数。信念を貫く強さがあり、専門性を極めることで孤高の成功を掴み取ります。' },
  8: { rank: '吉', type: '吉', score: 85, name: '堅実忍耐・富貴蓄積', desc: '地道な努力を惜しまない不屈の数。粘り強さと金銭感覚に優れ、時間をかけて磐石の基盤と豊かな財産を築き上げます。' },
  9: { rank: '注意', type: '凶', score: 58, name: '鋭敏直感・孤高芸術', desc: '並外れた直感と頭脳明晰さを誇る数。感情の起伏や孤独に注意し、芸術や学術など専門的な情熱へ昇華させると異才を放ちます。' },
  10: { rank: '注意', type: '凶', score: 48, name: '万象帰空・再起蓄力', desc: '浮き沈みを経験しやすい再生の数。波乱を乗り越える精神力を養い、良きパートナーや参謀を得ることで危機を転機に変えられます。' },
  11: { rank: '特大吉', type: '大吉', score: 96, name: '草木逢春・発展繁栄', desc: '冬を越えて芽吹く草木のごとく、順調に着実に発展する大吉数。人望、才能、温厚さに恵まれ、人生の後半に向かって大きく繁栄します。' },
  12: { rank: '注意', type: '凶', score: 52, name: '薄弱繊細・研鑽専念', desc: '感受性が豊かで細やかな気配りができる反面、内面の葛藤を抱えやすい数。無理に前に出ず、裏方や専門研究で実力を発揮します。' },
  13: { rank: '特大吉', type: '大吉', score: 97, name: '才知溢美・人気名声', desc: '天性の才気、話術、愛嬌を兼ね備えた人気大吉数。アイデアと人脈で道を切り拓き、大衆の支持を得て輝かしい成功を収めます。' },
  14: { rank: '半吉', type: '半吉', score: 68, name: '知性孤高・専門大成', desc: '冷静沈着で批判精神と分析力に優れた数。人付き合いをシンプルに保ち、高度な専門技術や研究職でその真価を発揮します。' },
  15: { rank: '特大吉', type: '大吉', score: 99, name: '徳望福禄・天下無双', desc: '名誉、財運、健康、家庭のすべてを満たす五大吉数のひとつ。温厚で人徳があり、誰からも愛されて幸福な人生を全うします。' },
  16: { rank: '特大吉', type: '大吉', score: 98, name: '頭領人望・衆望帰依', desc: '人を自然と惹きつけ、リーダーへと押し上げられる大頭領数。度量が大きく包容力があり、大事業を統率して大成功を収めます。' },
  17: { rank: '吉', type: '吉', score: 86, name: '剛健突破・明朗前進', desc: '強い信念と突破力で逆境を切り裂く剛健数。自己主張を適度に調整し、協調性を意識することで圧倒的なスピード出世を果たします。' },
  18: { rank: '吉', type: '吉', score: 88, name: '鉄心貫徹・事業成功', desc: '鉄のような強い精神力と実行力を持つ成功数。困難を恐れず目標へ突き進み、自力で事業や地位を確立します。' },
  19: { rank: '注意', type: '凶', score: 56, name: '天賦異才・障害克服', desc: '天才的な頭脳と美的センスを宿す異才数。波乱が起きやすいため、精神の平穏を保ち、クリエイティブや研究など一点集中が吉。' },
  20: { rank: '注意', type: '凶', score: 50, name: '波乱万丈・誠実慎重', desc: '予期せぬ変化に見舞われやすい数。欲をかかず堅実な生活を心がけ、誠実な人間関係を築くことで災いを回避できます。' },
  21: { rank: '特大吉', type: '大吉', score: 96, name: '独立棟梁・首領統率', desc: '男性・女性問わず組織の頂点に立つ独立首領数。強い責任感と卓抜した先見性で、一代で名声と地位を築き上げます。' },
  22: { rank: '注意', type: '凶', score: 55, name: '秋草逢霜・理想現実', desc: '理想が高く繊細な知性を持つ数。途中で諦めず、実現可能な目標から着実にステップを踏むことで運気が安定します。' },
  23: { rank: '特大吉', type: '大吉', score: 97, name: '旭日昇天・猛虎躍進', desc: '昇る朝日が万物を照らすような凄まじい勢いを持つ大成数。バイタリティに溢れ、困難を物ともせず高い目標を達成します。' },
  24: { rank: '特大吉', type: '大吉', score: 99, name: '無中有生・金運豊財', desc: 'ゼロから莫大な富と幸運を生み出す最大の金運吉祥数。知恵と人徳で財を築き、子孫まで繁栄をもたらす最上吉数です。' },
  25: { rank: '吉', type: '吉', score: 88, name: '英敏資質・堅実成功', desc: '頭脳明晰で商才と計画性に富んだ実業数。誠実な取引と着実な努力によって、周囲の信頼を得て大きな財産を築きます。' },
  26: { rank: '半吉', type: '半吉', score: 65, name: '波乱変転・義理人情', desc: '波乱を含みつつも、情に厚く英雄的な気質を持つ数。苦難を乗り越えるたびに人間的な器が広がり、晩年に大輪を咲かせます。' },
  27: { rank: '半吉', type: '半吉', score: 70, name: '直感判断・独往研鑽', desc: '鋭い洞察力とプライドを持つ学者・職人数。批判的な言動を慎み、自己の内面を高めることで専門分野の権威となります。' },
  28: { rank: '注意', type: '凶', score: 54, name: '豪気波瀾・協調開運', desc: '波瀾万丈の人生を歩みやすい豪快数。自我を抑えて他人の意見を素直に受け入れ、良き師・良き友に恵まれることで道が開けます。' },
  29: { rank: '吉', type: '吉', score: 86, name: '知謀策略・大志成就', desc: '深い知恵と大きな野心を秘めた策士数。欲望をコントロールし、社会的な公益のために知恵を使うことで大成功を収めます。' },
  30: { rank: '半吉', type: '半吉', score: 72, name: '吉凶相半・投機戒心', desc: '運気の波が激しいドラマチックな数。ギャンブル的な賭けを避け、堅実な本業に徹することで着実に成功を維持できます。' },
  31: { rank: '特大吉', type: '大吉', score: 99, name: '春日花開・智勇兼備', desc: '五大吉数の筆頭。知恵と勇気、人徳を兼ね備え、あらゆる困難を乗り越えて満願成就を果たす至高の人生大成数です。' },
  32: { rank: '特大吉', type: '大吉', score: 98, name: '僥倖多望・棚牡丹運', desc: '思いがけない幸運や引き立てに恵まれる棚ぼた大吉数。温和で親しみやすく、人との出会いがすべて財と成功へつながります。' },
  33: { rank: '特大吉', type: '大吉', score: 97, name: '旭日東天・権威絶頂', desc: '天空に輝く太陽のような絶対的権威数。大きな器と自信を持ち、国家・業界レベルの大事業を成し遂げるカリスマです。' },
  34: { rank: '注意', type: '凶', score: 48, name: '破乱苦難・克己精進', desc: '試練の多い数ですが、精神修行や不屈の努力によって人間的な深みを獲得し、人生の後半に逆転の光を見出せます。' },
  35: { rank: '吉', type: '吉', score: 89, name: '温良平和・芸道学術', desc: '穏やかで争いを好まない平安数。文学、芸術、学問、技術などの分野で着実に実力を発揮し、平穏で幸福な人生を送ります。' },
  36: { rank: '半吉', type: '半吉', score: 62, name: '波瀾義侠・献身開運', desc: '面倒見がよく義理人情に厚い侠気数。他人の世話で苦労しやすいですが、無私の心で人のために尽くすことで信頼を獲得します。' },
  37: { rank: '大吉', type: '大吉', score: 94, name: '忠実熱心・独立大成', desc: '誠実さと熱意で人の信頼を一身に集める大吉数。困難があっても助け船が現れ、自力で確固たる地位を築き上げます。' },
  38: { rank: '吉', type: '吉', score: 85, name: '文芸才能・着実発展', desc: '学術や創作、専門技能に秀でた文化数。派手なリーダーシップよりも、手堅い実務や専門分野で息の長い活躍をします。' },
  39: { rank: '大吉', type: '大吉', score: 92, name: '光明栄達・富貴長寿', desc: '光り輝く栄達を約束する強運数。長寿と繁栄に恵まれ、知恵と行動力で自らの道を堂々と切り開いていきます。' },
  40: { rank: '半吉', type: '半吉', score: 68, name: '謹厳実直・功罪相半', desc: '頭脳明晰で度胸もあるが、自信過剰になりやすい数。謙虚さを保ち、他者への感謝を忘れないことで名誉を守れます。' },
  41: { rank: '特大吉', type: '大吉', score: 97, name: '純陽独秀・大器晩成', desc: '徳望と知略を兼ね備えた大器晩成の頭領数。名誉・財運・人望がすべて揃い、年齢を重ねるごとに栄光が加速します。' },
  42: { rank: '吉', type: '吉', score: 80, name: '多才多芸・十全十美', desc: '何をやっても器用にこなすマルチ才能数。器用貧乏にならぬよう、本命の強みを一つ定めて深く掘り下げることで大成します。' },
  43: { rank: '注意', type: '凶', score: 58, name: '散財警戒・外華内実', desc: '華やかで見栄っ張りになりやすい数。浪費や見栄を慎み、内面と貯蓄を充実させることで安定した生活を守れます。' },
  44: { rank: '注意', type: '凶', score: 46, name: '破家亡身・慎重自重', desc: '逆境や障害に見舞われやすい試練数。無理な拡張を避け、安全第一で堅実な生活と周囲との協調を最優先にすべきです。' },
  45: { rank: '特大吉', type: '大吉', score: 96, name: '順風満帆・大志成就', desc: '知恵、決断力、行動力が三拍子揃った大吉数。周囲の信望を集めて大きな夢を実現し、順風満帆の人生を歩みます。' },
  46: { rank: '注意', type: '凶', score: 50, name: '羅網困難・地道誠実', desc: '網に囚われたような閉塞感を経験しやすい数。焦らず機が熟すのを待ち、身近な人に感謝して誠実に行動すれば道が開けます。' },
  47: { rank: '特大吉', type: '大吉', score: 98, name: '開花結実・大成富貴', desc: '努力がすべて花開き実を結ぶ最高の大吉数。天の助けと人の縁に恵まれ、一代で大きな財産と幸福を築き上げます。' },
  48: { rank: '大吉', type: '大吉', score: 95, name: '軍師顧問・有徳才能', desc: '優れた知恵と相談役としての徳を備えた参謀大吉数。人を育て支えることで自らも最高の名誉と豊かさを手に入れます。' },
  49: { rank: '半吉', type: '半吉', score: 70, name: '吉凶吉変・自立独行', desc: '吉と凶の振れ幅が大きい数。他力に頼らず自力でスキルを磨き、平常心を保つことで運気が大きく好転します。' },
  50: { rank: '半吉', type: '半吉', score: 66, name: '一成一敗・堅実保全', desc: '成功と挫折の波を経験しやすい数。一度掴んだ成功に奢らず、手堅く守りを固めることで晩年を平穏に過ごせます。' },
  51: { rank: '半吉', type: '半吉', score: 72, name: '盛衰交代・堅実努力', desc: '盛衰の波がある数。浮かれている時こそ慎重になり、地道な努力を怠らなければ名声を維持できます。' },
  52: { rank: '特大吉', type: '大吉', score: 96, name: '先見明察・大望達成', desc: '時代の先を読む卓抜した先見性と知略の数。チャンスを逃さず掴み取り、大きなビジネスや事業で大成します。' },
  53: { rank: '半吉', type: '半吉', score: 68, name: '内憂外見・内面充実', desc: '外見は華やかに見えて内面に苦労を抱えやすい数。見栄を捨て、本当に大切な家族や自分の心を大切にすることで安泰。' },
  54: { rank: '注意', type: '凶', score: 48, name: '横難悲運・防衛第一', desc: '予想外のアクシデントに注意が必要な数。健康管理と慎重な資金運用を心がけ、無理な冒険を避けることが肝要です。' },
  55: { rank: '半吉', type: '半吉', score: 70, name: '極盛極衰・中庸温存', desc: '極端から極端へ振れやすい数。極端な言動を避け、バランスと中庸を心がけることで安定した幸福を維持できます。' },
  56: { rank: '注意', type: '凶', score: 50, name: '暮色蒼然・忍耐待機', desc: '活力が減退しやすい数。無理に拡大しようとせず、現状の幸せを慈しみ、趣味や精神的な充実に重きを置くと吉。' },
  57: { rank: '吉', type: '吉', score: 85, name: '寒雪青松・剛毅成就', desc: '厳冬に耐える青松のように、苦難を乗り越えて最後に勝利を掴む剛健数。晩年に向かって大きく運が開けます。' },
  58: { rank: '吉', type: '吉', score: 84, name: '先苦後甘・大器晩成', desc: '若い頃の苦労がすべて後半生の糧となる大器晩成数。忍耐と誠意を貫くことで、晩年に大きな幸福と富を掴みます。' },
  59: { rank: '注意', type: '凶', score: 52, name: '意志薄弱・自律強化', desc: '周囲の意見に流されやすい数。自分の軸をしっかり持ち、良き師や信頼できるパートナーのアドバイスに従うと安心です。' },
  60: { rank: '注意', type: '凶', score: 45, name: '暗雲低迷・平穏第一', desc: '先の見通しが立ちにくい時期がある数。大きな野望を追うよりも、日々の平穏と身近な人々との絆を大切にすることで開運。' },
  61: { rank: '特大吉', type: '大吉', score: 95, name: '名利双収・繁栄富貴', desc: '知恵と美徳によって名誉と財運の両方を手に入れる大吉数。誠実な生き方が多くの人を惹きつけ、豊かな人生を送ります。' },
  62: { rank: '注意', type: '凶', score: 52, name: '雪上加霜・堅実守成', desc: '油断すると予期せぬ困難が重なりやすい数。分相応を守り、調子の良いときほど用心深く構えることで平穏を保てます。' },
  63: { rank: '特大吉', type: '大吉', score: 96, name: '万事順調・吉慶無双', desc: '天の助けに恵まれ、物事がトントン拍子に進む大吉数。周囲への感謝を忘れずに進めば、栄華を極めることができます。' },
  64: { rank: '注意', type: '凶', score: 48, name: '滅失崩壊・慎重自重', desc: '基盤が揺らぎやすい数。欲を出さず、確実な土台を固めること。健康と家族への配慮が最大の防御となります。' },
  65: { rank: '特大吉', type: '大吉', score: 98, name: '巨富名誉・四海名揚', desc: '天下に名声を轟かせ、巨万の富を築く最高クラスの大吉数。度量が広く器が大きいため、多くの人を導いて大成します。' },
  66: { rank: '注意', type: '凶', score: 46, name: '内外不和・和合重視', desc: '人間関係のトラブルやすれ違いが生じやすい数。自己主張を控え、相手の立場に立った対話を心がけることで災難を防げます。' },
  67: { rank: '特大吉', type: '大吉', score: 97, name: '通達利運・発展開運', desc: '障害を物ともせず、目的を次々と達成していく突破発展数。人脈とチャンスに恵まれ、輝かしい未来を切り開きます。' },
  68: { rank: '特大吉', type: '大吉', score: 95, name: '智慮明晰・発明創出', desc: '優れた知恵と思考力で、独自のアイデアや技術を創出する大吉数。学術やビジネスの分野で独自の地位を確立します。' },
  69: { rank: '注意', type: '凶', score: 50, name: '動揺不安定・堅実本分', desc: '環境の変化が多く心が落ち着きにくい数。あれこれ手を出さず、一つのことに集中して腰を据えることで道が開けます。' },
  70: { rank: '注意', type: '凶', score: 45, name: '廃退無力・現状維持', desc: '無理な冒険は禁物の数。静かに現状を守り、趣味や健康管理に力を注ぎながら、心の安らぎを第一に過ごすことが最善です。' },
  71: { rank: '半吉', type: '半吉', score: 73, name: '吉凶相半・着実前進', desc: '吉凶が入り混じる数。他人に頼らず自分の実力を頼みとし、堅実に歩みを進めることで後半生を安定させられます。' },
  72: { rank: '注意', type: '凶', score: 50, name: '前後激変・守勢第一', desc: '前半と後半で運気が激変しやすい数。好調なときにしっかりと蓄えを作り、調子に乗らない慎重さが身を助けます。' },
  73: { rank: '吉', type: '吉', score: 82, name: '無難平穏・自然吉祥', desc: '無理をせず自然の流れに身を任せることで幸運が巡る数。争いを避け、穏やかな生活を志向することで幸福を享受します。' },
  74: { rank: '注意', type: '凶', score: 48, name: '無知無能・研鑽自重', desc: '自分の力以上の大風呂敷を広げると破綻しやすい数。身の丈に合った目標を持ち、謙虚に学び続けることが大切です。' },
  75: { rank: '吉', type: '吉', score: 84, name: '守成安全・平和安泰', desc: '大きな冒険をしなければ、生涯を通じて安全と平和が守られる吉祥数。家庭と健康を大切にすることで幸せが続きます。' },
  76: { rank: '注意', type: '凶', score: 49, name: '内外不調・健康留意', desc: '心身の疲労や対人関係の疲れが出やすい数。無理な付き合いを減らし、体調管理とメンタルケアを優先すると吉。' },
  77: { rank: '半吉', type: '半吉', score: 72, name: '前後相半・晩節保全', desc: '人生の前半と後半で景色が変わる数。若い頃の経験を活かし、後半生は誠実な生き方で周囲から尊敬を集めます。' },
  78: { rank: '半吉', type: '半吉', score: 70, name: '華麗前駆・晩年堅実', desc: '若い頃に華やかな活躍をし、後半は堅実に暮らす数。過去の栄光に固執せず、等身大の今を楽しむことで吉となります。' },
  79: { rank: '注意', type: '凶', score: 47, name: '節制不足・自己管理', desc: '自己コントロールが課題となる数。生活リズムと金銭管理を徹底し、規律ある生活を送ることでトラブルを未然に防ぎます。' },
  80: { rank: '注意', type: '凶', score: 45, name: '終局空虚・心霊充足', desc: '物質的な成功よりも精神的な充足が大切になる数。ボランティアや文化的な活動を通じて、心の豊かさを育むと幸運。' },
  81: { rank: '特大吉', type: '大吉', score: 99, name: '還元復元・太極大円満', desc: '1に戻り、新たな宇宙が始まる至高の還元大吉数。すべての苦難を昇華し、最高の栄誉、長寿、子孫繁栄の円満を約束します。' }
};

// 五行属性の取得（下一桁）
function getGogyo(num) {
  const last = num % 10;
  if (last === 1 || last === 2) return { name: '木', en: 'Wood', color: '#34d399', desc: '大樹・草木。柔軟な成長力、向上心、仁愛。' };
  if (last === 3 || last === 4) return { name: '火', en: 'Fire', color: '#f87171', desc: '太陽・灯火。情熱、知性、礼節、明朗さ。' };
  if (last === 5 || last === 6) return { name: '土', en: 'Earth', color: '#fbbf24', desc: '大地・肥沃。包容力、信義、堅実な安定。' };
  if (last === 7 || last === 8) return { name: '金', en: 'Metal', color: '#e2e8f0', desc: '鉱石・刀剣。強固な意志、決断力、正義感。' };
  return { name: '水', en: 'Water', color: '#38bdf8', desc: '清流・大海。知恵、柔軟性、直感、適応力。' };
}

// 相生・相剋判定
function checkGogyoRelation(g1, g2) {
  if (g1 === g2) return { type: '比和', quality: 'good', score: 85, desc: '同じ属性同士で気脈が通じ合い、自然な協力関係が築かれます。' };
  const sheng = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
  if (sheng[g1] === g2) return { type: '相生（順生）', quality: 'great', score: 95, desc: g1 + 'が' + g2 + 'を生み出し育てる最高の好循環。無理なく才能が開花します。' };
  if (sheng[g2] === g1) return { type: '相生（受生）', quality: 'great', score: 92, desc: g2 + 'から温かいエネルギーを享受する恩恵の関係。引き立て運に恵まれます。' };
  const ke = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
  if (ke[g1] === g2) return { type: '相剋（抑制）', quality: 'warning', score: 65, desc: g1 + 'が' + g2 + 'を制約する関係。克服することで強い精神力と独自性が磨かれます。' };
  return { type: '相剋（被剋）', quality: 'warning', score: 60, desc: g2 + 'から圧力を受けやすい関係。柔軟な思考と周囲のサポートを活用すると大成します。' };
}

// 81数データの安全な取得（81を超えた場合もモジュロ還元）
function getNumData(n) {
  let normalized = n;
  while (normalized > 81) normalized -= 80;
  if (normalized <= 0) normalized = 1;
  return NUM_81_DATA[normalized] || { rank: '吉', type: '吉', score: 80, name: '着実発展', desc: '着実に前進する安定した数意です。' };
}

// ============================================================
// 生年月日解析エンジン（九星気学・数秘術・西洋占星術・手相タイプ）
// ============================================================

// 1. 九星気学（本命星）
const KYUSEI_DATA = {
  1: { name: '一白水星', elem: '水', color: '#38bdf8', traits: '柔軟な知恵・洞察力・大器晩成・水のごとき適応力', advice: '人脈としなやかな思考で道を拓く知性派。じっくり時間をかけることで最大の成果を得ます。' },
  2: { name: '二黒土星', elem: '土', color: '#fbbf24', traits: '母なる大地・育成力・堅実・縁の下の力持ち', advice: '人を支え育てることで自らも豊かになる徳分。手堅い努力が晩年に盤石の実りを生みます。' },
  3: { name: '三碧木星', elem: '木', color: '#34d399', traits: '雷と若木・圧倒的行動力・開拓・アイデア創出', advice: '時代の先頭を切って走る先駆者。直感と思いつきをスピーディに形にすると大化けします。' },
  4: { name: '四緑木星', elem: '木', color: '#10b981', traits: '風と大樹・信用第一・人望・遠方ビジネス縁', advice: '誰とでも調和できる天性のバランサー。人との縁と信用が最大の金運資産となります。' },
  5: { name: '五黄土星', elem: '土', color: '#d97706', traits: '中心の帝王・破壊と再生・強烈なカリスマ・統率力', advice: '逆境にあっても自力で頂点へ登り詰める帝王星。大きな度量で人を包み込むと天下無双。' },
  6: { name: '六白金星', elem: '金', color: '#f1f5f9', traits: '天空と宝石・崇高なプライド・指導者・完成の美', advice: '高い理想と妥協なきプロ意識を持つリーダー。公共の福祉のために動くとき絶大な加護を得ます。' },
  7: { name: '七赤金星', elem: '金', color: '#f59e0b', traits: '湖と金貨・豊かな話術・愛嬌・金運引き寄せ', advice: '人生を陽気に楽しむことで人が集まる愛され星。言葉とコミュニケーションが財を生みます。' },
  8: { name: '八白土星', elem: '土', color: '#b45309', traits: '霊峰富士・大改革・蓄財・節目での大飛躍', advice: '人生の節目で劇的な進化を遂げる大器。地道に蓄積した知識や資産が後半生で爆発します。' },
  9: { name: '九紫火星', elem: '火', color: '#f87171', traits: '太陽と紫炎・最高知性・先見性・美意識と名誉', advice: '先を見通す直感と美的センスの持ち主。情熱を燃やせる本命テーマに集中すると輝きます。' }
};

function calculateKyusei(year, month, day) {
  let y = parseInt(year);
  const m = parseInt(month);
  const d = parseInt(day);

  // 節分・立春（2月4日頃）の前なら前年扱い
  if (m === 1 || (m === 2 && d < 4)) {
    y -= 1;
  }

  // 西暦各桁の和を求める
  const sumDigits = (n) => n.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  let s = sumDigits(y);
  while (s > 9) s = sumDigits(s);

  let starNum = 11 - s;
  while (starNum > 9) starNum -= 9;
  if (starNum <= 0) starNum += 9;

  return { starNum, ...KYUSEI_DATA[starNum] };
}

// 2. カバラ数秘術（ライフパスナンバー）
const NUMEROLOGY_DATA = {
  1: { title: '開拓者・パイオニア', theme: '独立心・自力突破・意志の強さ', palmHint: '力強く立ち上がる運命線と太い親指を持ちやすい。' },
  2: { title: '調和のサポーター', theme: '共感力・平和・細やかな配慮', palmHint: '月丘へなだらかに下がる優しい知能線と柔らかな掌。' },
  3: { title: '陽気なクリエイター', theme: '表現力・ユーモア・創造的ひらめき', palmHint: '太陽線や感情線の先端が明るく枝分かれしやすい。' },
  4: { title: '堅実なマスターアーキテクト', theme: '構造化・秩序・信頼と持続力', palmHint: '直線的でブレない知能線と四角く引き締まった掌。' },
  5: { title: '自由な冒険者', theme: '多才・変化・コミュニケーション・行動', palmHint: '旅行線や複数の直感線が刻まれやすい。' },
  6: { title: '愛と美の守護者', theme: '献身・美意識・家庭・責任感', palmHint: '金星丘の豊かなふくらみと深い環状感情線。' },
  7: { title: '真理を探求する哲学者', theme: '探求心・分析力・直感・孤高の専門性', palmHint: '神秘十字線や仏心紋（仏の目）が現れやすい。' },
  8: { title: '豊かさを具現化する大統率者', theme: '事業力・パワー・成功・富の循環', palmHint: '覇王線（三叉線）や力強い太陽線・財運線。' },
  9: { title: '慈愛の人道主義者', theme: '包容力・大局観・理想・完結', palmHint: '長い知能線と手のひら全体に広がる繊細な気配り線。' },
  11: { title: '天啓を受け取る巫女・メッセンジャー', theme: '直感・霊感・高次元の気づき', palmHint: '神秘十字や二重感情線などの特殊吉祥紋。' },
  22: { title: '大宇宙の具現者・グランドビルダー', theme: '大構想・理想の現実化・地球規模のビジョン', palmHint: 'ますかけ線（百握り）や強烈な一直線の主線。' },
  33: { title: '無償の愛を注ぐ菩薩・宇宙的カリスマ', theme: '普遍の愛・規格外のスケール・癒やし', palmHint: 'ソロモンの環や月丘から伸びる引き立て線。' }
};

function calculateNumerology(year, month, day) {
  const str = String(year) + String(month).padStart(2, '0') + String(day).padStart(2, '0');
  
  const reduceToSingleOrMaster = (val) => {
    while (val > 9 && val !== 11 && val !== 22 && val !== 33) {
      val = val.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return val;
  };

  let total = str.split('').reduce((a, b) => a + parseInt(b), 0);
  let lifePath = reduceToSingleOrMaster(total);

  return {
    lifePath,
    ...(NUMEROLOGY_DATA[lifePath] || NUMEROLOGY_DATA[1])
  };
}

// 3. 西洋占星術（太陽星座 12星座）
function calculateZodiac(month, day) {
  const m = parseInt(month);
  const d = parseInt(day);

  const signs = [
    { name: '牡羊座', en: 'Aries', elem: '火', span: [3, 21, 4, 19], traits: '情熱・突破力・純粋な生命力' },
    { name: '牡牛座', en: 'Taurus', elem: '地', span: [4, 20, 5, 20], traits: '五感の豊かさ・粘り強さ・着実な富' },
    { name: '双子座', en: 'Gemini', elem: '風', span: [5, 21, 6, 21], traits: '知的好奇心・言語化・軽やかな適応' },
    { name: '蟹座', en: 'Cancer', elem: '水', span: [6, 22, 7, 22], traits: '深い共感・仲間を守る母性・豊かな感情' },
    { name: '獅子座', en: 'Leo', elem: '火', span: [7, 23, 8, 22], traits: '堂々たる自己表現・誇り・創造の太陽' },
    { name: '乙女座', en: 'Virgo', elem: '地', span: [8, 23, 9, 22], traits: '精緻な分析・実務力・誠実な改善' },
    { name: '天秤座', en: 'Libra', elem: '風', span: [9, 23, 10, 23], traits: '調和の美学・社交性・洗練されたバランス' },
    { name: '蠍座', en: 'Scorpio', elem: '水', span: [10, 24, 11, 22], traits: '本質を見抜く洞察・不屈の情熱・変容' },
    { name: '射手座', en: 'Sagittarius', elem: '火', span: [11, 23, 12, 21], traits: '高い理想・自由・哲学と探求の旅' },
    { name: '山羊座', en: 'Capricorn', elem: '地', span: [12, 22, 1, 19], traits: '社会的大成・規律・最高到達点' },
    { name: '水瓶座', en: 'Aquarius', elem: '風', span: [1, 20, 2, 18], traits: '独創的な改革・未来志向・博愛' },
    { name: '魚座', en: 'Pisces', elem: '水', span: [2, 19, 3, 20], traits: '無条件の癒やし・直感・アート・霊性' }
  ];

  for (const s of signs) {
    const [sm, sd, em, ed] = s.span;
    if ((m === sm && d >= sd) || (m === em && d <= ed)) return s;
  }
  return signs[9]; // 山羊座年末年始
}

// 4. 生年月日 ＆ 姓名総合ハンドタイプ（4大エレメント掌型判定）
function calculateHandType(zodiacElem, kyuseiElem, jinGogyo) {
  // 最も優勢なエレメントを算出
  const score = { '火': 0, '地': 0, '風': 0, '水': 0 };
  
  const mapElem = (e) => {
    if (e === '火') return '火';
    if (e === '土') return '地';
    if (e === '金') return '風';
    if (e === '木') return '風';
    return '水';
  };

  score[zodiacElem] = (score[zodiacElem] || 0) + 3;
  const kMapped = mapElem(kyuseiElem);
  score[kMapped] = (score[kMapped] || 0) + 3;
  const jMapped = mapElem(jinGogyo);
  score[jMapped] = (score[jMapped] || 0) + 4;

  let bestElem = '風';
  let maxScore = -1;
  for (const [k, v] of Object.entries(score)) {
    if (v > maxScore) {
      maxScore = v;
      bestElem = k;
    }
  }

  const handTypes = {
    '火': {
      name: '🔥 火の手（情熱と直感・冒険リーダー型）',
      shape: '正方形の掌 ＋ 短めの活動的な指',
      traits: '旺盛なエネルギー、決断の早さ、人を引っ張る熱量。生命線が大きく張り出し、情熱線が発達しやすい。',
      color: '#f87171'
    },
    '地': {
      name: '⛰️ 地の手（実直と構築・磐石の実業家型）',
      shape: '四角く厚みのある掌 ＋ 頑丈で規則的な指',
      traits: '抜群の安定感、忍耐強さ、現実的な形にする力。知能線がまっすぐ伸び、運命線が大地からそびえ立つ。',
      color: '#fbbf24'
    },
    '風': {
      name: '🌿 風の手（知性と対話・論理的ストラテジスト型）',
      shape: '正方形に近い掌 ＋ すらりと長い思考の指',
      traits: '明晰な頭脳、多角的視点、コミュニケーション。二股に分かれる知能線や明瞭な水星丘が特徴。',
      color: '#34d399'
    },
    '水': {
      name: '🌊 水の手（共感と美意識・高感度クリエイター型）',
      shape: '細長く繊細な掌 ＋ しなやかな芸術の指',
      traits: '鋭い直感、豊かな感受性、人の心を掴む芸術センス。月丘へ深く下降する知能線と鎖状の温かな感情線。',
      color: '#38bdf8'
    }
  };

  return handTypes[bestElem] || handTypes['風'];
}

// ============================================================
// 姓名判断 ＆ 生年月日 統合ファースト判定エンジン
// ============================================================
function calculateNameAndBirthDivination(seiChars, meiChars, birthYear, birthMonth, birthDay) {
  const seiList = seiChars.filter(c => c && c.char.trim() !== '');
  const meiList = meiChars.filter(c => c && c.char.trim() !== '');

  if (seiList.length === 0 || meiList.length === 0) return null;

  const seiStrokes = seiList.reduce((acc, c) => acc + (parseInt(c.strokes) || 1), 0);
  const meiStrokes = meiList.reduce((acc, c) => acc + (parseInt(c.strokes) || 1), 0);

  const tenKaku = seiStrokes;
  const lastSeiStroke = parseInt(seiList[seiList.length - 1].strokes) || 1;
  const firstMeiStroke = parseInt(meiList[0].strokes) || 1;
  const jinKaku = lastSeiStroke + firstMeiStroke;
  const chiKaku = meiStrokes;
  const souKaku = seiStrokes + meiStrokes;

  let gaiKaku = souKaku - jinKaku;
  if (seiList.length === 1 && meiList.length === 1) {
    gaiKaku = 2;
  } else if (gaiKaku <= 0) {
    gaiKaku = (seiList.length > 1 ? (parseInt(seiList[0].strokes) || 1) : 1) + 
              (meiList.length > 1 ? (parseInt(meiList[meiList.length - 1].strokes) || 1) : 1);
  }

  const tenData = { kaku: tenKaku, ...getNumData(tenKaku), gogyo: getGogyo(tenKaku), label: '天格（祖先運・宿命）' };
  const jinData = { kaku: jinKaku, ...getNumData(jinKaku), gogyo: getGogyo(jinKaku), label: '人格（主運・内面・才能）' };
  const chiData = { kaku: chiKaku, ...getNumData(chiKaku), gogyo: getGogyo(chiKaku), label: '地格（初年運・身体・基盤）' };
  const gaiData = { kaku: gaiKaku, ...getNumData(gaiKaku), gogyo: getGogyo(gaiKaku), label: '外格（対人運・援助・社会縁）' };
  const souData = { kaku: souKaku, ...getNumData(souKaku), gogyo: getGogyo(souKaku), label: '総格（晩年運・総合到達点）' };

  // 三才配置
  const tenJin = checkGogyoRelation(tenData.gogyo.name, jinData.gogyo.name);
  const jinChi = checkGogyoRelation(jinData.gogyo.name, chiData.gogyo.name);
  const sansaiScore = Math.round((tenJin.score + jinChi.score) / 2);

  let sansaiType = '順風吉相';
  let sansaiDesc = '';
  if (tenJin.quality === 'great' && jinChi.quality === 'great') {
    sansaiType = '三才最吉・天地調和相';
    sansaiDesc = '天からの引き立てと大地の支えが一体となった最上級の吉相です。目上からの強力な引き立てを得て成功し、家庭や部下・健康の土台も盤石です。';
  } else if (tenJin.quality === 'great' || jinChi.quality === 'great') {
    sansaiType = '大業発展・伸長相';
    sansaiDesc = '天または地の強力な追い風を受けて着実に階段を登り詰める発展相です。自らの得意分野を極めることで大きな名誉と実りを手にします。';
  } else if (tenJin.quality === 'good' && jinChi.quality === 'good') {
    sansaiType = '比和堅実・自立相';
    sansaiDesc = '自らの意志と堅実な努力で道を切り拓く自力相です。ブレない軸を持ち、マイペースに本物の実力を養うことで後半生に大成します。';
  } else {
    sansaiType = '試練克服・開拓相';
    sansaiDesc = '葛藤や試練を乗り越えることで人間的な器が飛躍的に大きくなる英雄相です。柔軟な思考と周囲への感謝を意識することで、ピンチを大チャンスへ転換できます。';
  }

  // 生年月日占術の計算
  const kyusei = calculateKyusei(birthYear, birthMonth, birthDay);
  const numerology = calculateNumerology(birthYear, birthMonth, birthDay);
  const zodiac = calculateZodiac(birthMonth, birthDay);
  const handType = calculateHandType(zodiac.elem, kyusei.elem, jinData.gogyo.name);

  // 総合スコア（100点満点換算）
  const overallScore = Math.min(99, Math.round(
    (jinData.score * 0.3) + 
    (souData.score * 0.3) + 
    (chiData.score * 0.1) + 
    (gaiData.score * 0.1) +
    (sansaiScore * 0.2)
  ));

  // ファースト判定の総合天命プロファイル
  const firstAssessment = {
    title: jinData.name + ' × ' + kyusei.name + 'が宿す「大器晩成の天命器」',
    coreEssence: 'あなたのお名前が持つ中心運『人格：' + jinData.kaku + '画（' + jinData.name + '・' + jinData.gogyo.name + '性）』と、生年月日に刻まれた『本命星：' + kyusei.name + '』『数秘運命数：' + numerology.lifePath + '（' + numerology.title + '）』は、非常に高い共鳴関係にあります。' +
                 kyusei.traits + 'をベースに持ちながら、名前に授けられた言霊が「自らの知恵で価値を生み出す力」を力強く後押ししています。',
    workMoney: '【才能と金運の潮目】\n' +
               numerology.theme + 'に強い星回りを持ちます。誰かに依存するよりも自立した専門性やプロフェッショナルな領域で最大の財運を引き寄せます。総格『' + souData.kaku + '画（' + souData.rank + '）』が示す通り、30代・40代で培った経験が50代以降に大きな黄金の実りを結ぶ大器晩成の流れです。',
    palmPrediction: '【あなたに出やすい手相のサイン（予測）】\n' +
                    'あなたの掌型は『' + handType.name + '』です。' + numerology.palmHint + '\n' +
                    '知能線は「' + (jinData.gogyo.name === '火' || jinData.gogyo.name === '木' ? '直感と創造性を宿し月丘へ美しく下降' : '現実的でシャープな直線') + '」を描き、運命線が中年期から力強く立ち上がる相を強く宿しています。',
    actionAdvice: '【今日からの開運アクション】\n' +
                  '太陽星座（' + zodiac.name + '・' + zodiac.elem + '元素）の光を取り入れるため、朝の陽の光を浴びながら親指の付け根（金星丘）と小指の下（水星丘）をやさしくほぐしてください。言霊と掌紋のエネルギーが巡り、手のひらに幸運の線が刻まれます。'
  };

  return {
    seiStr: seiList.map(c => c.char).join(''),
    meiStr: meiList.map(c => c.char).join(''),
    seiList,
    meiList,
    birth: {
      year: parseInt(birthYear),
      month: parseInt(birthMonth),
      day: parseInt(birthDay)
    },
    ten: tenData,
    jin: jinData,
    chi: chiData,
    gai: gaiData,
    sou: souData,
    sansai: {
      tenJin,
      jinChi,
      type: sansaiType,
      desc: sansaiDesc,
      score: sansaiScore,
      pattern: tenData.gogyo.name + ' → ' + jinData.gogyo.name + ' → ' + chiData.gogyo.name
    },
    kyusei,
    numerology,
    zodiac,
    handType,
    overallScore,
    firstAssessment
  };
}

// 互換性ラッパー（既存の呼び出し対応）
function calculateNameDivination(seiChars, meiChars) {
  return calculateNameAndBirthDivination(seiChars, meiChars, 1985, 5, 15);
}

// 「手相 × 姓名判断 ＆ 生年月日」のハイブリッド相乗シンクロ解析
function generatePalmNameSynergy(nameResult, palmMetrics = null) {
  if (!nameResult) return null;

  const jin = nameResult.jin;
  const sou = nameResult.sou;
  const chi = nameResult.chi;
  const sansai = nameResult.sansai;
  const kyusei = nameResult.kyusei;
  const num = nameResult.numerology;

  let mindSynergy = '';
  if (jin.gogyo.name === '火' || jin.gogyo.name === '木') {
    mindSynergy = '手相の知能線が示す「高い独創力と直感性」に、名前に宿る『人格：' + jin.kaku + '画（' + jin.name + '・' + jin.gogyo.name + '性）』と『' + kyusei.name + '』の突破力が完全にシンクロしています。アイデアを頭の中にとどめず、スピーディにアウトプット・表現することで、大人の新たなキャリアや創作が急激に加速します。';
  } else if (jin.gogyo.name === '金' || jin.gogyo.name === '土') {
    mindSynergy = '手相が示す「現実的な分析力と着実な構築力」が、名前に刻まれた『人格：' + jin.kaku + '画（' + jin.name + '・' + jin.gogyo.name + '性）』と数秘' + num.lifePath + 'の堅固な信頼感と見事に共鳴しています。周囲が浮き足立っている時でも冷静に全体を俯瞰し、磐石の成果を積み上げられる稀有な器です。';
  } else {
    mindSynergy = '手相の感情線の豊かな共感性と、名前に流れる『人格：' + jin.kaku + '画（' + jin.name + '・水性）』の柔軟な知恵が融合。誰とでもしなやかに打ち解けながら、本質を見抜く鋭い洞察力で人生の難局を軽やかに乗り越えられます。';
  }

  let bodySynergy = '';
  if (chi.score >= 85) {
    bodySynergy = '手相の豊かな金星丘（スタミナの源泉）と、名前の『地格：' + chi.kaku + '画（' + chi.name + '・吉数）』が強固な生命の土台を築いています。生まれ持った基礎体力が充実しており、人生の転機や多忙な局面でも粘り強く走り抜くことができます。';
  } else {
    bodySynergy = '手相の生命線が教える「マイペースな休息の重要性」と、名前の『地格：' + chi.kaku + '画』のメッセージが重なります。無理な過労を避け、金星丘のマッサージや自然に触れる時間を大切にすることで、内に秘めた無限のバイタリティが引き出されます。';
  }

  let fateSynergy = '';
  if (sou.score >= 90) {
    fateSynergy = '手相の運命線・太陽線が予見する「晩年に向かう大成の光」が、名前の最高峰『総格：' + sou.kaku + '画（' + sou.name + '）』によって約束されています。人生の前半で経験した苦労や試行錯誤はすべて黄金の糧となり、50代・60代以降に人生最大の収穫期と社会的名声を迎える大器晩成相です。';
  } else {
    fateSynergy = '手相の運命線が示す「自力で未来を書き換える開拓精神」が、名前の『総格：' + sou.kaku + '画（' + sou.name + '）』を強力に後押しします。手相は思考と行動で数ヶ月ごとに変化します。名前の数意をポジティブに意識して前進することで、手のひらに力強い太陽線が新たに刻み込まれます。';
  }

  const masterAdvice = '【掌印・言霊・星辰の完全調和】あなたの手相（リアルタイムの航海図）と、姓名（一生の言霊の器）、そして生年月日（本命星：' + kyusei.name + ' / 運命数：' + num.lifePath + '）は、三才配置『' + sansai.pattern + '』のもとで調和しています。名前に宿る本来の長所を信じて手のひらを前にかざしてください。運命は常に、あなたの手の中で育ち続けています。';

  return {
    mindSynergy,
    bodySynergy,
    fateSynergy,
    masterAdvice,
    synergyScore: Math.min(99, Math.round((nameResult.overallScore + 94) / 2))
  };
}
