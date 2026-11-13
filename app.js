(() => {
  const STORAGE_KEY = 'pbz-first-run-checklist-v1';
  const checklistVersion = 1;
  const A = (n) => `ach:${String(n).padStart(2, '0')}`;
  const Q = (name) => `tale:${name}`;
  const G = (name) => `gate:${name}`;

  const categories = [
    ['all', '全部'], ['story', '剧情'], ['boss', '头目'], ['side', '支线'],
    ['gear', '收集与强化'], ['combat', '招式'], ['risk', '错过风险']
  ];

  const achievements = [
    { n:1, title:'寻心路', en:"The Heart's Journey", cat:'story', area:'悲泣溪谷', desc:'在主线大路上摆脱追兵。', areaId:'r1' },
    { n:2, title:'逆行不逆心', en:'An Unwavering Heart', cat:'story', area:'悲泣溪谷', desc:'穿过前哨营地。', areaId:'r1' },
    { n:3, title:'黑塔蔽天光', en:'Blotting Out the Sky', cat:'story', area:'悲泣溪谷', desc:'走出瀑布后的山洞。', areaId:'r1' },
    { n:4, title:'茫茫无立处', en:'Nowhere to Stand', cat:'story', area:'血色森林', desc:'破解镜林幻境。', areaId:'r2' },
    { n:5, title:'蒙花不解厄', en:'Blossom of False Salvation', cat:'story', area:'陆家村', desc:'离开陆家村，进入庞镇。', areaId:'r3' },
    { n:6, title:'纵身赴危局', en:'Into the Deadly Trap', cat:'story', area:'庞镇', desc:'行经“组织”酒馆。', areaId:'r4' },
    { n:7, title:'世浊人心空', en:'A World Gone Hollow', cat:'story', area:'庞镇／戏梦山庄', desc:'破解青蛇屋中的蛇首机关。', areaId:'r8' },
    { n:8, title:'是非谁人定', en:'Who Can Judge?', cat:'story', area:'正道大营', desc:'探查大校场。', areaId:'r5' },
    { n:9, title:'故人今何处', en:'Where Have Old Friends Gone?', cat:'story', area:'戏梦山庄', desc:'抵达镜花水月。', areaId:'r8' },
    { n:10, title:'水天纵浊流', en:'Muddy Waters Run Deep', cat:'story', area:'梅谷湖', desc:'斩破湖心。', areaId:'r6' },
    { n:11, title:'碧血照重明', en:'Blood Heralds the Dawn', cat:'story', area:'戏梦山庄', desc:'穿过戏梦山庄。', areaId:'r8' },
    { n:12, title:'霜雪正堪行', en:'Through Frost and Snow', cat:'story', area:'断魂山', desc:'踏入风雪，向崖顶前进。', areaId:'r9' },
    { n:13, title:'昭昭心与血', en:'With Heart and Blood', cat:'story', area:'断魂山', desc:'完成真结局“历历事皆明”。错过终盘条件后，本周目无法补回。', areaId:'r9', risk:true },
    { n:14, title:'巨斧余恨', en:"The Axe's Grudge", cat:'boss', area:'悲泣溪谷', desc:'击败斧老大：彭猛。', areaId:'r1' },
    { n:15, title:'红妆鬼斩', en:'Scarlet Wraithblade', cat:'boss', area:'悲泣溪谷', desc:'击败新娘阿花。', areaId:'r1' },
    { n:16, title:'猎杀', en:'The Hunt', cat:'boss', area:'悲泣溪谷', desc:'击败猎杀者：追命。', areaId:'r1' },
    { n:17, title:'千杯散尽', en:'A Thousand Cups Drained', cat:'boss', area:'血色森林', desc:'击败剑痴：花千笑。', areaId:'r2' },
    { n:18, title:'镜碎蛇影', en:'The Shattered Mirror', cat:'boss', area:'血色森林', desc:'击败双蛇夫人：白赤练。', areaId:'r2' },
    { n:19, title:'来日可如约？', en:'Will We Meet Again?', cat:'boss', area:'陆家村', desc:'击败组织少主：沐小葵。', areaId:'r3' },
    { n:20, title:'焰尽狮魂传', en:"The Lion's Spirit Lives On", cat:'boss', area:'庞镇', desc:'击败舞狮尊主：烈焰。', areaId:'r4' },
    { n:21, title:'剑横北斗', en:'Sword Against the Seven-Stars', cat:'boss', area:'正道大营', desc:'击败七星剑阵：大师兄。', areaId:'r5' },
    { n:22, title:'血滴歧路', en:'Crossroads of Blood', cat:'boss', area:'枷笼山', desc:'击败昆仑叛教者：荒行子。', areaId:'r7' },
    { n:23, title:'物善其用', en:'Nothing Goes to Waste', cat:'boss', area:'悲泣溪谷·朱宅', desc:'击败活人偶清道夫；需后续拿到朱宅钥匙才能回头。', areaId:'r1' },
    { n:24, title:'皆归尘土', en:'All Return to Dust', cat:'boss', area:'戏梦山庄', desc:'击败“虎炮”：雷铛。', areaId:'r8' },
    { n:25, title:'白影巍巍', en:'The White Shadow', cat:'boss', area:'梅谷湖', desc:'击败风雪刀客。', areaId:'r6' },
    { n:26, title:'锯理力争', en:'Saw It Through', cat:'boss', area:'断魂山', desc:'击败力者与锯者。', areaId:'r9' },
    { n:27, title:'大梦终须醒', en:'All Dreams Must End', cat:'boss', area:'终章', desc:'击败普通结局头目“诡谋尽成空”。真结局路线也会经过。', areaId:'r9' },
    { n:28, title:'独步烟波', en:'Master of the Misty Waters', cat:'boss', area:'梅谷湖', desc:'击败梅谷湖的水行帮主游龙、琴女烟千岁和独眼弓客。', areaId:'r6' },
    { n:29, title:'四释“玉”囚', en:'The Four Freed', cat:'boss', area:'跨区域', desc:'击败四大人偶：玉瓒、玉璧、玉鼎、玉琮；部分目标要后期回访。', areaId:'r8' },
    { n:30, title:'刀冠双绝', en:'The Two Blade Masters', cat:'boss', area:'梅谷湖／枷笼山', desc:'击败火刀：祝原与横刀：毕峰。两战都是真结局路线目标。', areaId:'r7' },
    { n:31, title:'力挫三差', en:'Three Wardens Fall', cat:'boss', area:'庞镇及后续区域', desc:'击败三大鬼差高手：斩骑、勾魂、断肠。', areaId:'r6' },
    { n:32, title:'禁法湖底沉', en:'Forbidden Arts Beneath the Lake', cat:'side', area:'梅谷湖', desc:'完成支线“湖心秘密”。这是确认的错过成就与真结局条件。', areaId:'r6', risk:true },
    { n:33, title:'“影”承血，“刃”同源', en:'Phantom and Blade', cat:'side', area:'断魂山', desc:'完成“血脉觉醒”（五根龙柱）。指南对它是否会错过有分歧；一周目建议在终盘前做完。', areaId:'r9', caution:true },
    { n:34, title:'白山遗烈', en:'The Last of Baishan', cat:'side', area:'血色森林／正道大营', desc:'完成“白山派秘闻”：先在血色森林桥上接取，再推进到正道大营。', areaId:'r5', risk:true },
    { n:35, title:'白首不相离', en:'Together Till the End', cat:'side', area:'陆家村／庞镇', desc:'完成“归家之旅”。进入庞镇前要接取并完成陆家村阶段。', areaId:'r3', risk:true },
    { n:36, title:'浪子侠心', en:"A Wanderer's Honor", cat:'side', area:'陆家村／庞镇', desc:'完成“兰家大少”。进入庞镇前要接取并完成陆家村阶段。', areaId:'r3', risk:true },
    { n:37, title:'鬼斩客', en:'Spectral Blade', cat:'side', area:'悲泣溪谷／梅谷湖／断魂山', desc:'完成“断裂的心印”。最迟离开悲泣溪谷前交还第一块原石。', areaId:'r1', risk:true },
    { n:38, title:'杏林有继', en:'The Healer’s Legacy', cat:'side', area:'悲泣溪谷／血色森林', desc:'完成“肉灵芝”“见习医者”“医者仁心”。打静夜前完成药草委托，打白赤练前完成救治与交付。', areaId:'r2', risk:true },
    { n:39, title:'妙手拾遗', en:'Lost and Found', cat:'side', area:'五个区域', desc:'完成全部“妙手空空”委托并交还宝物。建议沿途交付；是否属于硬性错过项，各指南说法不一。', areaId:'r8', caution:true },
    { n:40, title:'草木也知愁', en:'Even Trees Know Sorrow', cat:'side', area:'五个区域', desc:'完成“榕树之心”的五场菩提试炼。攻略普遍认为通关后仍可补。', areaId:'r7' },
    { n:41, title:'神“器”十足', en:'A Tempered Ten', cat:'gear', area:'庞镇以后', desc:'为 10 把不同武器进行一次魂锻。', areaId:'r4' },
    { n:42, title:'一力降十会', en:'Overwhelming Force', cat:'gear', area:'全程可做', desc:'将任意一把武器强化至 30 级。', areaId:'r9' },
    { n:43, title:'珀力非凡', en:'Complete Mastery', cat:'gear', area:'全区域', desc:'收集 10 块煞气琥珀。', areaId:'r6' },
    { n:44, title:'且听花声', en:'Listen to Every Flower', cat:'gear', area:'全区域', desc:'集齐 10 朵完整的记忆之花（不是 10 片花瓣）。', areaId:'r6' },
    { n:45, title:'取石有道', en:'Leave No Stone Unturned', cat:'gear', area:'全区域', desc:'收集 10 块黑石。', areaId:'r6' },
    { n:46, title:'博物杂记', en:'Collector’s Notes', cat:'gear', area:'全区域', desc:'收集 30 件饰品。', areaId:'r6' },
    { n:47, title:'“影”多不压身', en:'Phantom Arsenal', cat:'gear', area:'庞镇以后', desc:'为 10 件影之武装进行一次魂锻。', areaId:'r4' },
    { n:48, title:'一巧破百拙', en:'Skill Over Strength', cat:'gear', area:'全程可做', desc:'将任意一件影之武装强化至 30 级。', areaId:'r9' },
    { n:49, title:'“影”之道', en:'Way of the Phantom', cat:'combat', area:'前期即可', desc:'执行一次连锁暗杀。', areaId:'r1' },
    { n:50, title:'“刃”之道', en:'Way of the Blade', cat:'combat', area:'前期即可', desc:'执行一次连锁处决。', areaId:'r1' },
    { n:51, title:'破伤风之刃', en:'The Rusted Blade', cat:'combat', area:'悲泣溪谷', desc:'用“残钢刃”使敌人流血。', areaId:'r1' },
    { n:52, title:'醉生梦死', en:'A Drunken Dream', cat:'combat', area:'血色森林', desc:'用“痴者残剑”进入“大醉”状态。', areaId:'r2' },
    { n:53, title:'兵不血刃', en:'Bloodless Victory', cat:'combat', area:'取得软蛇剑后', desc:'用“灵蛇软剑”的“后发先至”弹反敌人攻击。', areaId:'r3' },
    { n:54, title:'灭烛见真火', en:'The Flame Within', cat:'combat', area:'断魂山／终盘', desc:'用“炼狱胭脂”释放“幻刃”。', areaId:'r9' },
    { n:55, title:'渴饮刀头血', en:'The Blade’s Thirst', cat:'combat', area:'取得亡命斩马刀后', desc:'用“亡命斩马刀”释放“嗜血狂刃”。', areaId:'r2' },
    { n:56, title:'御雪凝霜', en:'Snow and Frost', cat:'combat', area:'梅谷湖', desc:'用“白影”冻结敌人。', areaId:'r6' },
    { n:57, title:'一刀两断', en:'Cleave in Two', cat:'combat', area:'取得偃月刀后', desc:'用偃月刀“青龙斩”直接斩杀敌人。', areaId:'r4' },
    { n:58, title:'延时爆破', en:'Delayed Blast', cat:'combat', area:'陆家村', desc:'完成沐小葵五条红绳后解锁第三阶段，取得“妖锯”并触发“妖气侵蚀”。', areaId:'r3' },
    { n:59, title:'环环相扣', en:'Perfectly Linked', cat:'combat', area:'取得玉双环后', desc:'用“玉双环”连续抛出飞环并命中锁定目标。', areaId:'r4' },
    { n:60, title:'白山风雷动', en:'Baishan Tempest', cat:'combat', area:'正道大营', desc:'用“白山风雷剑”释放“雷霆风暴”。', areaId:'r5' },
    { n:61, title:'天降金瓜', en:'Heavenfall Strike', cat:'combat', area:'取得碎颅杆后', desc:'用“碎颅杆”从空中砸中敌人。', areaId:'r5' },
    { n:62, title:'翻江倒海', en:'Turning the Tide', cat:'boss', area:'庞镇＋梅谷湖', desc:'先后击败两次水行帮主：游龙（庞镇和梅谷湖各一战）。', areaId:'r6' },
    { n:63, title:'拳力以赴', en:'Fists of Fury', cat:'combat', area:'取得铁拳套后', desc:'用“铁拳套”打出“宗师拳”。', areaId:'r5' },
    { n:64, title:'电光石火', en:'Lightning Fast', cat:'combat', area:'取得雷霆枪后', desc:'用“雷霆枪”麻痹敌人。', areaId:'r6' },
    { n:65, title:'无中生友', en:'A Friend from Thin Air', cat:'combat', area:'取得召唤类影之武装后', desc:'使用任意召唤类影之武装召出助战单位。', areaId:'r4' },
    { n:66, title:'逆天改命', en:'Defy Destiny', cat:'completion', area:'最终清扫', desc:'解锁其余 65 项 Steam 成就。', areaId:'r9' }
  ];

  const regions = [
    { id:'r1', no:'01', name:'悲泣溪谷', subtitle:'溪谷、前哨营地与煞气塔', locations:61, map:'https://www.powerpyx.com/phantom-blade-zero-weeping-creek-valley-collectible-locations/',
      warning:'离开溪谷前先完成“断裂的心印”第一步；与前哨营地的逃兵对话，之后才能调查墓碑拿“磐石护符”。',
      achievements:[1,2,3,14,15,16,23,37,49,50,51],
      tales:[['肉灵芝','回溪谷把双生肉莲交给玉儿；后续还要再推进。',true],['四凶斧','收集案卷后把证据交给庞镇的识途童子；攻略对时限说法不一，建议尽早做。',false],['荡平宗门','与屋顶的老弓手接取并完成；奖励“羽弓”。',true],['腐败秘闻','与铁匠附近的守卫触发，完成调查，不要只打开院门。',true],['见习医者','先接取，再交付止血藤、凝脂叶与污秽金草。',true],['断裂的心印','杀气塔顶与影哨对话，拿到原石后交还。',true],['三重威胁','进入溪谷雕像触发；可以先标记，后期再回来打。',false]],
      counts:{bells:23,gear:7,equipment:12,trials:1,amber:4,blackstone:4,flowers:1,treasures:0,tempering:2},
      objects:['磐石护符（先找前哨营地的逃兵对话，再调查斧老大囚牢附近的墓碑）','羽弓（“荡平宗门”奖励；白赤练战前拿）','药匣（交还三株药草后玉儿给；静夜战前完成）','原石与煞气炉曲柄（断裂的心印首段）','煞气琥珀碎片 ×4 · 黑石碎片 ×4','完整记忆之花点位 ×1','赤色庄园回访：拿到傀儡之舌后再回收清道夫与后续物品'],
      treasures:[] },
    { id:'r2', no:'02', name:'血色森林', subtitle:'镜林、盗贼营地与赤练关口', locations:86, map:'https://www.powerpyx.com/phantom-blade-zero-crimson-forest-collectible-locations/',
      warning:'白赤练是早期最大关口。打她前清掉所有已开放的支线，尤其“医者仁心”“白山派秘闻”接取、“荡平宗门”“腐败秘闻”。',
      achievements:[4,17,18,34,38,52,55],
      tales:[['盗亦有道','把飞贼的血书交给弟弟并答对三问，奖励“静音裹布”。',true],['医者仁心','救治森林里的四名伤者，再回盗贼营地向玉儿汇报。',true],['白山派秘闻','先在去盗贼营地的大桥上找兰兰接取；之后在正道大营继续。',true],['斩草除根','陆家村下井前完成；一份攻略列为可错过，但不属确认奖杯项。',false],['以彼之道','完成当前地图上可接的委托。',false],['拳心不改','遇到任务人物时及时对话并完成后续。',false]],
      counts:{bells:19,gear:6,equipment:14,trials:2,amber:6,blackstone:6,flowers:18,treasures:3,tempering:5},
      objects:['快手张：在囚笼旁放下吊笼救人，解锁后续委托；先确认他已脱困','血染封印、宗主鼻烟壶、古弩 ×3 件失落宝物','煞气琥珀碎片 ×6 · 黑石碎片 ×6','记忆之花点位 ×18','“静音裹布”与“安神葫芦”来自限时支线','后续雪地回访会重新开启部分铃铛与道路'],
      treasures:['血染封印','宗主鼻烟壶','古弩'] },
    { id:'r3', no:'03', name:'陆家村', subtitle:'村口、木偶井与沐小葵的红绳', locations:76, map:'https://www.powerpyx.com/phantom-blade-zero-village-of-lu-collectible-locations/',
      warning:'进入庞镇前接取“归家之旅”和“兰家大少”，并完成两条任务在陆家村的首段；见到沐小葵前集齐五条红绳。',
      achievements:[5,19,35,36,53,58],
      tales:[['归家之旅','在老根处接取；进入庞镇前完成首段，之后回收战车并把遗物交还。',true],['兰家大少','在藏身处接取；进庞镇后跟进兰府钥匙与后续战斗。',true],['木偶心','调查木偶相关线索，按任务日志推进。',false],['母亲的梦','沿任务标记完成陆家村阶段。',false],['大荒','与村中人物对话接取后推进。',false],['翠儿','先保留红绸，之后需要与陆三千的信一起交付。',false]],
      counts:{bells:22,gear:7,equipment:10,trials:1,amber:4,blackstone:4,flowers:16,treasures:3,tempering:3},
      objects:['沐小葵五条红绳：井边、蓝火萤寺、长廊桥、夫人地、井下；打头目前集齐','婚烛、白玉双生、未揭雕像 ×3 件失落宝物','陆家村码头：沐小葵战后拿“黄莺剑”及煞气琥珀碎片，再离开码头','夜萤花组用于开启“湖心秘密”','煞气琥珀碎片 ×4 · 黑石碎片 ×4'],
      treasures:['婚烛','白玉双生','未揭雕像'] },
    { id:'r4', no:'04', name:'庞镇', subtitle:'南部庞镇 · 与戏梦山庄共用区域进度', locations:108, map:'https://www.powerpyx.com/phantom-blade-zero-pangzhen-collectible-locations/',
      warning:'地图计数把庞镇与戏梦山庄合并；下方只列庞镇南段数量。开放青蛇屋前，保守路线是先完成前十个紫色谜团。',
      achievements:[6,20,31,39,41,47,57,59,62,65],
      tales:[['同门相残','按任务日志推进庞镇相关人物线。',false],['剑与道','与庞镇 NPC 对话接取并完成。',false],['不灭英魂','六名正道大师兄跪地时及时处决；最多可失手两次。',true],['星戏子','在庞镇找到对应任务人物并完成。',false],['方块','跟进“方块”支线。',false],['别忘了我','与湖区的白蛇屋委托相连。',false],['母亲的心','根据任务标记完成。',false],['再续兄弟情','根据任务标记完成。',false]],
      counts:{bells:27,gear:8,equipment:16,trials:2,amber:8,blackstone:8,flowers:19,treasures:4,tempering:8},
      objects:['青蛇屋门前核对：庞镇任务日志、紫色谜团与三枚蛇屋信物','玉笔刷架、虎形镇纸、墨条、刻边砚台 ×4 件失落宝物','交付宝物时在戏梦山庄据点找快手张，才能拿“雷月灯”','煞气琥珀碎片 ×8 · 黑石碎片 ×8','见到密斯特后开放武器与影之武装魂锻'],
      treasures:['玉笔刷架','虎形镇纸','墨条','刻边砚台'] },
    { id:'r5', no:'05', name:'正道大营', subtitle:'夕照小径、试炼与白山派后续', locations:60, map:'https://www.powerpyx.com/phantom-blade-zero-mandate-encampment-collectible-locations/',
      warning:'“白山派秘闻”在打玉笔前检查日志，确保“击败毕桃桃的人偶形态”已出现；部分花瓣掉落有攻略反馈异常，捡完马上看计数。',
      achievements:[8,21,29,34,40,60,61,63],
      tales:[['薛某，仰慕英雄','在正道大营接取并完成。',false],['黑暗宗门之女','在鸽舍遇到赤时选择放过她，继续后续支线。',true]],
      counts:{bells:17,gear:4,equipment:6,trials:1,amber:4,blackstone:4,flowers:19,treasures:0,tempering:3},
      objects:['“白山派秘闻”：吴冷霜战后检查花丛中的毕桃桃遗体，再打玉笔','“不灭英魂”：六名大师兄下跪时处决，最多放过两人','放过赤，保留“黑暗宗门之女”后续、记忆之花与双鱼坠','煞气琥珀碎片 ×4 · 黑石碎片 ×4','菩提试炼 ×1；记忆之花点位 ×19'],
      treasures:[] },
    { id:'r6', no:'06', name:'梅谷湖', subtitle:'煞气塔、歌姬与湖心谜团', locations:99, map:'https://www.powerpyx.com/phantom-blade-zero-meigu-lake-collectible-locations/',
      warning:'“湖心秘密”与后续真结局条件要在终盘警告前完成。祝原与毕峰虽是可选头目，却关联真结局与成就。',
      achievements:[10,25,28,30,31,32,43,44,45,46,56,62,64],
      tales:[],
      counts:{bells:22,gear:5,equipment:11,trials:4,amber:6,blackstone:6,flowers:30,treasures:3,tempering:11},
      objects:['湖心秘密：跟进夜萤、面具、傀儡眼与幻术师遗迹等步骤','梅谷湖东侧长柱试炼 ×1；其它挑战点 ×3','枯星盘、无常日晷、蓝花罗盘 ×3 件失落宝物','煞气琥珀碎片 ×6 · 黑石碎片 ×6 · 记忆之花点位 ×30','击败湖上游龙、烟千岁、独眼弓客；并完成庞镇游龙二战成就','梅谷湖影哨处继续“断裂的心印”'],
      treasures:['枯星盘','无常日晷','蓝花罗盘'] },
    { id:'r7', no:'07', name:'枷笼山', subtitle:'囚山秘径 · 真结局支线区域', locations:38, map:'https://www.powerpyx.com/phantom-blade-zero-mountain-of-imprisonment-collectible-locations/',
      warning:'跨桥进入戏梦山庄前，先做完“哭声从何而来”的两段祭坛目标；过桥会关闭血色森林的几处铃铛。此截止点仅部分攻略明确列出。',
      achievements:[22,30,33,40],
      tales:[['阔刃','打开附近牢门，与武林斗士交谈。',false],['英雄悲歌','让刘逸活着，不要杀死他；继续推进后续。',true],['赎罪账簿','与枷笼山相关人物对话后完成。',false],['白雪','按安全路线先完成陈朱对话与任务；该支线是否严格可错过，资料有分歧。',false]],
      counts:{bells:8,gear:5,equipment:4,trials:1,amber:1,blackstone:4,flowers:6,treasures:0,tempering:2},
      objects:['昆仑长柱试炼 ×1；继续推进“血脉觉醒”','“英雄悲歌”：保住刘逸性命，收集“墨裁”影之武装','放出陆三千时交付“无根露”，保留后续信件线索','完成“哭声从何而来”两处祭坛目标后再跨往戏梦山庄','煞气琥珀碎片 ×1 · 黑石碎片 ×4 · 记忆之花点位 ×6'],
      treasures:[] },
    { id:'r8', no:'08', name:'戏梦山庄', subtitle:'庞镇北段 · 终盘前的最后整备', locations:56, map:'https://www.powerpyx.com/phantom-blade-zero-mirage-estate-pangzhen-collectible-locations/',
      warning:'青蛇屋与戏梦山庄被多个攻略视作主要锁门点。资料对少数谜团是否可晚做有分歧；最稳做法是开门前完成全部前置紫色任务。',
      achievements:[7,9,11,24,29,33,39,41,47],
      tales:[],
      counts:{bells:15,gear:2,equipment:6,trials:1,amber:4,blackstone:4,flowers:15,treasures:3,tempering:6},
      objects:['戏梦山庄挑战点与第五根龙柱：完成“血脉觉醒”','将幻域宝物交给戏梦山庄据点的快手张，拿“雷月灯”','大将军铜镜、金银香囊、金云月簪 ×3 件失落宝物','煞气琥珀碎片 ×4 · 黑石碎片 ×4 · 记忆之花点位 ×15','检查手账所有紫色任务，尤其湖心、幻琵琶、血脉觉醒'],
      treasures:['大将军铜镜','金银香囊','金云月簪'] },
    { id:'r9', no:'09', name:'断魂山', subtitle:'终章 · 终盘警告前的最后检查', locations:23, map:'https://www.powerpyx.com/phantom-blade-zero-mount-soulrend-collectible-locations/',
      warning:'到“最后机会”铃铛前会出现最终警告。先手动存档，再核对湖心秘密、血脉觉醒、真结局紫色任务和全部七项确认错过成就。',
      achievements:[12,13,26,27,33,42,48,54,66],
      tales:[],
      counts:{bells:8,gear:3,equipment:0,trials:0,amber:0,blackstone:0,flowers:6,treasures:0,tempering:6},
      objects:['“最后机会”铃铛前手动存档','与因断裂的心印线索出现的影刃交手，完成后续','完成五根龙柱：4 根前置龙柱 + 戏梦山庄第 5 根','集齐真结局所需紫色任务；确认因尼斯的终盘对话','此区域记忆之花点位 ×6；其余地图收集品可在通关后回访','结束后留在本周目自由探索，不要立刻开始新周目'],
      treasures:[] }
  ];

  const gates = [
    { id:'gate-mindseal', no:'01', area:'悲泣溪谷', title:'离开溪谷前：交还“断裂的心印”第一块原石', text:'在杀气塔顶与影哨接取；击败高梯下方敌人拿曲柄，打开一层煞气炉取得原石，再交还给影哨。首段触发的精确截止未被完全验证，按最早安全点完成。', deadline:'最迟：离开悲泣溪谷前', ach:'鬼斩客', level:'已确认', check:true },
    { id:'gate-doctor', no:'02', area:'悲泣溪谷', title:'静夜战前：完成“见习医者”并领到药匣', text:'先向玉儿接任务，再交止血藤、凝脂叶、污秽金草。攻略指出静夜·亡命战后任务会失败。拿药匣后再进血色森林。', deadline:'最迟：击败静夜·亡命前', ach:'杏林有继', level:'已确认', check:true },
    { id:'gate-bai', no:'03', area:'血色森林', title:'白赤练战前：清完森林支线', text:'做完“医者仁心”（救四名伤者并回报）、“盗亦有道”（血书与三问）、“肉灵芝”交付；完成“荡平宗门”拿羽弓、“腐败秘闻”调查，并先接“白山派秘闻”。保守路线也在此完成当前日志里其他能做的支线。', deadline:'最迟：击败双蛇夫人·白赤练前', ach:'白山遗烈、杏林有继等', level:'已确认', check:true },
    { id:'gate-bi', no:'04', area:'正道大营', title:'玉笔战前：白山派秘闻必须出现后续目标', text:'完成吴冷霜遭遇后，在花丛检查毕桃桃遗体；确认日志目标变为“击败毕桃桃的人偶形态”，再打玉笔。否则支线与相关成就会断。', deadline:'最迟：击败玉笔前', ach:'白山遗烈', level:'已确认', check:true },
    { id:'gate-well', no:'05', area:'陆家村', title:'下井前：完成“斩草除根”', text:'尽早扫完盗贼与僧人相关步骤。仅部分指南列出此截止，且它不是确认的奖杯条件；一周目路线按安全做法完成。', deadline:'最迟：进入陆家村井下区域前', ach:'支线与饰品', level:'指南分歧', check:false },
    { id:'gate-lu', no:'06', area:'陆家村', title:'进入庞镇前：接取两条支线并推进首段', text:'在老根处接“归家之旅”，在兰少爷藏身处接“兰家大少”；两条都完成陆家村阶段。之后回头跟进庞镇任务。', deadline:'最迟：离开陆家村进入庞镇前', ach:'白首不相离、浪子侠心', level:'已确认', check:true },
    { id:'gate-ribbons', no:'07', area:'陆家村', title:'沐小葵战前：集齐五条红绳', text:'五处分别在三偶井、蓝火萤寺、长廊桥、夫人地、井下。集齐后再与沐小葵交手，开启隐藏第三阶段并取得“妖锯”等奖励。', deadline:'最迟：挑战沐小葵前', ach:'延时爆破（取得妖锯）', level:'物品与隐藏阶段', check:true },
    { id:'gate-dock', no:'08', area:'陆家村', title:'沐小葵战后：离开码头前拿黄莺剑', text:'回到码头检查木箱，收取“黄莺剑”和煞气琥珀碎片。攻略提示离开后电梯失效，这两件物品会错过。', deadline:'最迟：离开战后码头前', ach:'武器收集', level:'错过物品', check:true },
    { id:'gate-red', no:'09', area:'正道大营', title:'遇见赤时：选择放过她', text:'在鸽舍不要杀死赤，之后推进“黑暗宗门之女”。可获得双鱼坠与她的记忆之花。', deadline:'选择不可逆', ach:'支线与收集品', level:'选择分支', check:false },
    { id:'gate-kneel', no:'10', area:'正道大营', title:'六名大师兄：跪地时逐一处决', text:'六次遭遇中都抓住跪地窗口处决，最多允许两次失败；第三次让其起身会使“ 不灭英魂 ”失败。', deadline:'六次遭遇中逐场完成', ach:'英雄胆与后续奖励', level:'选择／战斗窗口', check:false },
    { id:'gate-lu-sanqian', no:'11', area:'梅谷湖／枷笼山', title:'放出陆三千时：交付“无根露”', text:'交付后他才会继续前往夫人祠，并留下后续线索及翠儿任务需要的信。拒绝后本周目不能完成他的故事。', deadline:'释放陆三千的对话中', ach:'支线与关键书信', level:'选择分支', check:false },
    { id:'gate-liuyi', no:'12', area:'枷笼山', title:'“英雄悲歌”：让刘逸活下来', text:'不要在山中杀死刘逸，继续完成后续支线，可取得“墨裁”影之武装。', deadline:'与刘逸相遇时', ach:'支线与影之武装', level:'选择分支', check:false },
    { id:'gate-whence', no:'13', area:'枷笼山', title:'跨桥进戏梦山庄前：完成“哭声从何而来”的祭坛步骤', text:'在枷笼山完成两段祭坛目标。跨桥后血色森林的分离雾、镜林深处、系丝巨树、墓地与煞气塔等铃铛会关闭。此项仅部分攻略明确记录，建议保守处理。', deadline:'最迟：跨过通往戏梦山庄的桥前', ach:'紫色谜团／区域铃铛', level:'指南分歧', check:false },
    { id:'gate-green-door', no:'14', area:'庞镇', title:'开启青蛇屋前：完成前十个紫色谜团', text:'按日志逐个完成：谷底深处、因尼斯幻象、煞气船、虚荣的诱惑、幻琵琶、昆仑长柱、哭声从何而来、先驱者幻象、朱宅、湖心秘密。攻略对部分截止存在分歧，青蛇屋前全部清完最稳。', deadline:'最迟：进入青蛇屋／戏梦山庄前', ach:'湖底禁术、昭昭心与血等', level:'真结局安全线', check:true },
    { id:'gate-zhang', no:'15', area:'戏梦山庄', title:'快手张宝物：在戏梦山庄据点交最后一批', text:'为拿“雷月灯”，戏梦山庄宝物要交给戏梦山庄据点的快手张；不要把最后一批交在更早的据点。宝物收集本身通常可通关后清理。', deadline:'最终交付地点有要求', ach:'妙手拾遗', level:'奖励分歧', check:false },
    { id:'gate-final', no:'16', area:'断魂山', title:'“最后机会”铃铛前：存档并核对真结局条件', text:'完成“湖心秘密”（含与因尼斯对话）、“血脉觉醒”五根龙柱及所有紫色任务。“最后机会”提示出现不代表你已错过；请在继续之前检查日志并另存档。', deadline:'最迟：继续越过“最后机会”后', ach:'昭昭心与血、禁法湖底沉', level:'确认硬门槛', check:true },
    { id:'gate-quickhand', no:'17', area:'血色森林', title:'救出快手张并解锁委托', text:'在血色森林囚笼处放下吊笼救他，确认他出现于盗贼营地。保守路线现在就做，避免错过其委托链与后续宝物。', deadline:'初次经过囚笼时', ach:'妙手拾遗路线准备', level:'提前完成', check:false },
    { id:'gate-boulderguard', no:'18', area:'悲泣溪谷', title:'拿磐石护符的前置对话', text:'先在前哨营地右侧棚屋与“石化的正道弟子”对话，再去斧老大的囚牢附近调查墓碑拿护符。关于离开区域后还能否补领，各攻略/玩家记录不一致。', deadline:'建议：离开血色森林前确认拿到', ach:'饰品收集', level:'指南分歧', check:false },
    { id:'gate-cui', no:'19', area:'陆家村／断魂山', title:'翠儿任务线：保留红绸并交付陆三千的信', text:'陆家村取得翠儿的红绸，枷笼山让陆三千收下无根露，之后将红绸与信交给陆杰元。终章双头目战前完成。', deadline:'最迟：挑战力者与锯者前', ach:'支线收尾', level:'安全路线', check:false },
    { id:'gate-lake', no:'20', area:'梅谷湖', title:'湖心秘密：完成整条线，不要只接任务', text:'在陆家村拾取萤火相关记忆之花开启，收集四面具与傀儡之眼，完成幻术师遗迹并找因尼斯收尾。拿到湖心成就后再准备终章。', deadline:'最迟：最后机会铃铛前', ach:'禁法湖底沉', level:'已确认', check:true }
  ];

  const mysteries = ['谷底深处','因尼斯幻象','煞气船','虚荣的诱惑','幻琵琶','昆仑长柱','哭声从何而来','先驱者幻象','朱宅','湖心秘密','血脉觉醒'];
  const globalThresholds = [
    ['amber10','杀气琥珀',10,'颗'],['blackstone10','黑石',10,'块'],['flowers10','完整记忆之花',10,'朵'],['accessories30','饰品',30,'件'],
    ['weapon-temper10','魂锻武器',10,'把'],['edge-temper10','魂锻影之武装',10,'件'],['weapon-level30','30 级武器',1,'把'],['edge-level30','30 级影之武装',1,'件']
  ];
  const specialSets = [
    { title:'沐小葵的五条红绳', items:[['ribbon:well','三偶井'],['ribbon:temple','蓝火萤寺'],['ribbon:bridge','长廊桥'],['ribbon:grounds','夫人地'],['ribbon:well-below','井下']] },
    { title:'四名傩面使', items:[['mask:yanru','炎如之焰面具 · 陆家村'],['mask:leiting','雷霆面具 · 庞镇'],['mask:guhe','古河毒面具 · 梅谷湖'],['mask:hansui','寒髓霜面具 · 朱宅']] },
    { title:'五根龙柱', items:[['pillar:valley','悲泣溪谷龙柱'],['pillar:crimson','血色森林龙柱'],['pillar:meigu','梅谷湖龙柱'],['pillar:ruins','幻术师遗迹龙柱'],['pillar:estate','戏梦山庄龙柱']] },
    { title:'五场菩提试炼', items:[['banyan:crimson','血色森林'],['banyan:pangzhen','庞镇'],['banyan:mandate','正道大营'],['banyan:meigu','梅谷湖'],['banyan:mountain','枷笼山']] },
    { title:'快手张的 16 件失落宝物', items:[
      ['treasure:血染封印','血色森林 · 血染封印'],['treasure:宗主鼻烟壶','血色森林 · 宗主鼻烟壶'],['treasure:古弩','血色森林 · 古弩'],
      ['treasure:婚烛','陆家村 · 婚烛'],['treasure:白玉双生','陆家村 · 白玉双生'],['treasure:未揭雕像','陆家村 · 未揭雕像'],
      ['treasure:玉笔刷架','庞镇 · 玉笔刷架'],['treasure:虎形镇纸','庞镇 · 虎形镇纸'],['treasure:墨条','庞镇 · 墨条'],['treasure:刻边砚台','庞镇 · 刻边砚台'],
      ['treasure:枯星盘','梅谷湖 · 枯星盘'],['treasure:无常日晷','梅谷湖 · 无常日晷'],['treasure:蓝花罗盘','梅谷湖 · 蓝花罗盘'],
      ['treasure:大将军铜镜','戏梦山庄 · 大将军铜镜'],['treasure:金银香囊','戏梦山庄 · 金银香囊'],['treasure:金云月簪','戏梦山庄 · 金云月簪']
    ] }
  ];
  const regionalSpecialIds = {
    r1:['pillar:valley'],
    r2:['pillar:crimson','banyan:crimson'],
    r3:['ribbon:well','ribbon:temple','ribbon:bridge','ribbon:grounds','ribbon:well-below','mask:yanru'],
    r4:['mask:leiting','banyan:pangzhen'],
    r5:['banyan:mandate'],
    r6:['mask:guhe','pillar:meigu','pillar:ruins','banyan:meigu'],
    r7:['banyan:mountain'],
    r8:['mask:hansui','pillar:estate'],
    r9:[]
  };
  const countNames = [
    ['bells','铃铛'],['gear','武器／影之武装'],['equipment','饰品／药品'],['trials','挑战地点'],
    ['amber','煞气琥珀碎片'],['blackstone','黑石碎片'],['flowers','记忆之花点位'],['treasures','失落宝物'],['tempering','淬炼材料']
  ];
  const taleTotals = regions.reduce((sum, r) => sum + r.tales.length, 0);

  let state = loadState();
  let activeCategory = 'all';
  let showIncompleteOnly = false;
  let toastTimer;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { version:checklistVersion, checks:{}, counts:{}, updatedAt:null };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') throw new Error('invalid');
      return { version:checklistVersion, checks:parsed.checks && typeof parsed.checks === 'object' ? parsed.checks : {}, counts:parsed.counts && typeof parsed.counts === 'object' ? parsed.counts : {}, updatedAt:parsed.updatedAt || null };
    } catch (_) {
      return { version:checklistVersion, checks:{}, counts:{}, updatedAt:null };
    }
  }

  function persist() {
    state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      const indicator = document.getElementById('save-status');
      if (indicator) indicator.textContent = '已保存到本机';
    } catch (_) {
      const indicator = document.getElementById('save-status');
      if (indicator) indicator.textContent = '无法写入浏览器存储';
    }
  }

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function isChecked(id) { return Boolean(state.checks[id]); }
  function checkRow(id, label, note = '', badge = '') {
    const checked = isChecked(id);
    return `<label class="check-row ${checked ? 'is-checked' : ''}"><input data-check="${esc(id)}" type="checkbox" ${checked ? 'checked' : ''}><span>${esc(label)}${badge ? ` <em class="badge-inline">${esc(badge)}</em>` : ''}${note ? `<small>${esc(note)}</small>` : ''}</span></label>`;
  }

  function renderGateOverview() {
    const cards = [
      ['01','血色森林','白赤练前清支线'],['02','陆家村','进庞镇前接两条委托'],['03','青蛇屋','开门前做紫色谜团'],['04','断魂山','最后机会前存档核对']
    ];
    document.getElementById('gate-overview').innerHTML = cards.map(c => `<article class="gate-overview-card"><span class="gate-num">关口 ${c[0]}</span><b>${c[1]}</b><span>${c[2]}</span></article>`).join('');
  }

  function renderGlobalChecklist() {
    const openSets = new Set([...document.querySelectorAll('.global-set[open]')].map(item => item.id));
    const thresholds = globalThresholds.map(([key,label,target,unit]) => {
      const id = `global:${key}`;
      const value = Math.min(target,Math.max(0,Number(state.counts[id] || 0)));
      return `<label class="global-count"><span>${esc(label)}<small>成就门槛</small></span><span class="global-count-control"><input type="number" min="0" max="${target}" step="1" inputmode="numeric" data-count="${id}" data-target="${target}" value="${value}" aria-label="${label}进度"><em>/ ${target} ${unit}</em></span></label>`;
    }).join('');
    const sets = specialSets.map((set,index) => {
      const id = `global-set-${index}`;
      const open = openSets.size ? openSets.has(id) : index === 0;
      return `<details id="${id}" class="global-set" ${open ? 'open' : ''}><summary>${esc(set.title)}<span>${set.items.filter(([itemId])=>isChecked(itemId)).length} / ${set.items.length}</span></summary><div class="global-set-items">${set.items.map(([itemId,label]) => checkRow(itemId,label)).join('')}</div></details>`;
    }).join('');
    const mysteryId = 'global-set-mystery';
    const mysteryOpen = openSets.has(mysteryId);
    const mysterySet = `<details id="${mysteryId}" class="global-set mystery-set" ${mysteryOpen ? 'open' : ''}><summary>真结局紫色任务（最稳路线：青蛇屋前完成）<span>${mysteries.filter((_,i)=>isChecked(`mystery:${i}`)).length} / ${mysteries.length}</span></summary><div class="global-set-items two-column">${mysteries.map((name,i)=>checkRow(`mystery:${i}`,name)).join('')}</div></details>`;
    document.getElementById('global-checklist').innerHTML = `<div class="global-checklist-head"><div><span class="section-kicker">全局收集目标</span><h3>成就门槛与特殊套组</h3><p>全成就不需要把地图 100% 捡空。以下是成就门槛、容易漏的独立套组和真结局清单。</p></div><span class="global-checklist-badge">建议沿途核对</span></div><div class="global-threshold-grid">${thresholds}</div><div class="global-sets">${sets}${mysterySet}</div>`;
  }

  function renderGates() {
    document.getElementById('gate-list').innerHTML = gates.map(g => `
      <article class="risk-card">
        <span class="risk-index">${g.no}</span>
        <div><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p><span class="risk-deadline">${esc(g.deadline)}</span><div class="risk-tags"><span class="risk-tag">${esc(g.area)}</span><span class="risk-tag ${g.level === '指南分歧' ? 'conflict' : ''}">${esc(g.level)}</span>${g.ach ? `<span class="risk-tag">关联：${esc(g.ach)}</span>` : ''}</div></div>
        <label class="risk-check" aria-label="标记完成：${esc(g.title)}"><input data-check="${esc(G(g.id))}" type="checkbox" ${isChecked(G(g.id)) ? 'checked' : ''}></label>
      </article>`).join('');
  }

  function renderCountInputs(region) {
    return `<div class="collectible-grid">${countNames.filter(([key]) => (region.counts[key] || 0) > 0).map(([key,label]) => {
      const target = region.counts[key];
      const id = `count:${region.id}:${key}`;
      const value = Math.min(target, Math.max(0, Number(state.counts[id] || 0)));
      return `<label class="count-card"><span class="count-label">${esc(label)}<small>逐点地图核对数</small></span><span class="count-control"><input type="number" min="0" max="${target}" step="1" inputmode="numeric" data-count="${id}" data-target="${target}" value="${value}" aria-label="${region.name} ${label}进度"><span>/ ${target}</span></span></label>`;
    }).join('')}</div>`;
  }

  function renderAchievementsInRegion(region) {
    const rows = achievements.filter(a => region.achievements.includes(a.n));
    if (!rows.length) return '<p class="muted-note">本区没有独立成就节点；继续核对路线与收集项。</p>';
    return `<div class="check-list">${rows.map(a => checkRow(A(a.n), a.title, a.desc, a.risk ? '错过风险' : a.caution ? '保守完成' : '')).join('')}</div>`;
  }

  function renderTales(region) {
    if (!region.tales.length) return '<p class="muted-note">本区没有新列出的任务名；继续追踪之前开启的紫色任务。</p>';
    return `<div class="check-list">${region.tales.map(([name,note,risk]) => checkRow(Q(name), name, note, risk ? '限时优先' : '')).join('')}</div>`;
  }

  function renderRegion(region) {
    const done = region.achievements.filter(n => isChecked(A(n))).length;
    const todo = region.achievements.length;
    const danger = Boolean(region.warning);
    const special = region.objects.map((item,i) => `<label class="item-tag checkable-tag ${/黄莺剑|磐石护符|药匣|羽弓|红绳|原石|最后机会|湖心秘密|龙柱|雷月灯|无根露|墨裁/.test(item) ? 'important' : ''}"><input data-check="object:${region.id}:${i}" type="checkbox" ${isChecked(`object:${region.id}:${i}`) ? 'checked' : ''}><span>${esc(item)}</span></label>`).join('');
    const regionalSpecials = specialSets.flatMap(set => set.items.map(([id,label]) => ({ id,label }))).filter(item => regionalSpecialIds[region.id]?.includes(item.id));
    const regionalSpecialHtml = regionalSpecials.length ? `<div class="subsection-label"><span>本区套组清单</span><span>${regionalSpecials.length} 项</span></div><div class="check-list">${regionalSpecials.map(item => checkRow(item.id,item.label)).join('')}</div>` : '';
    const treasureChecks = region.treasures.length ? `<div class="subsection-label"><span>快手张的宝物 · ${region.treasures.length} 件</span><span>逐件勾选</span></div><div class="check-list">${region.treasures.map(t => checkRow(`treasure:${t}`,t,'交回对应据点的快手张。')).join('')}</div>` : '';
    const crossChecks = '';
    const suffix = region.id === 'r4' ? '<span class="region-subtitle">地图与戏梦山庄合并计数，当前显示南段</span>' : '';
    return `<details class="region-card ${danger ? 'is-risk' : ''}" id="${region.id}">
      <summary class="region-summary"><span class="region-ordinal">${region.no}</span><span><span class="region-title">${esc(region.name)}</span><span class="region-subtitle">${esc(region.subtitle)}</span>${suffix}</span><span class="region-achievement-preview">${region.achievements.slice(0,3).map(n => `<em class="achievement-pill ${achievements.find(a=>a.n===n)?.risk ? 'risky' : ''}">${esc(achievements.find(a=>a.n===n)?.title || '')}</em>`).join('')}</span><span class="region-progress-mini">成就 ${done}/${todo}</span><span class="region-chevron">⌄</span></summary>
      <div class="region-body"><div class="region-intro"><span class="danger-pip"></span><span><b class="region-warning">本区提醒：</b>${esc(region.warning)}<br><span class="muted-note">攻略逐点清单记录 ${region.locations} 个核对点。该数字是路线检查规模，不等同于奖杯要求。</span></span></div>
        <div class="region-body-grid"><div class="region-column"><h4>本区成就</h4>${renderAchievementsInRegion(region)}<div class="subsection-label"><span>支线任务 · ${region.tales.length} 条</span><span>在区域日志逐项确认</span></div>${renderTales(region)}</div>
        <div class="region-column"><h4>收集品进度</h4>${renderCountInputs(region)}${treasureChecks}${regionalSpecialHtml}<div class="subsection-label"><span>关键物品／路线收集</span><span>重点核对</span></div><div class="item-tags">${special}</div>${crossChecks}<a class="region-link" href="${region.map}" target="_blank" rel="noreferrer">查看本区逐点收集路线 <span>↗</span></a></div></div>
      </div>
    </details>`;
  }

  function renderRegions(query = '') {
    const opened = new Set([...document.querySelectorAll('.region-card[open]')].map(card => card.id));
    const q = query.trim().toLocaleLowerCase();
    const filtered = regions.filter(r => !q || [r.name,r.subtitle,r.warning,...r.objects,...r.tales.map(x=>x[0]),...r.tales.map(x=>x[1])].join(' ').toLocaleLowerCase().includes(q));
    document.getElementById('region-list').innerHTML = filtered.length ? filtered.map(renderRegion).join('') : '<div class="no-results">没有找到匹配的区域或项目。</div>';
    document.querySelectorAll('.region-card').forEach(card => { if (opened.has(card.id)) card.open = true; });
    updateProgress();
  }

  function renderFilters() {
    const wrap = document.getElementById('achievement-filters');
    wrap.innerHTML = categories.map(([key,label]) => `<button type="button" class="filter-chip ${activeCategory === key ? 'is-active' : ''}" data-filter="${key}">${label}</button>`).join('') + `<button type="button" class="filter-chip ${showIncompleteOnly ? 'is-active' : ''}" data-incomplete="true">只看未完成</button>`;
  }

  function renderAchievements() {
    const query = document.getElementById('achievement-search').value.trim().toLocaleLowerCase();
    const filtered = achievements.filter(a => {
      const textMatch = !query || `${a.title} ${a.en} ${a.desc} ${a.area}`.toLocaleLowerCase().includes(query);
      const catMatch = activeCategory === 'all' || (activeCategory === 'risk' ? a.risk : a.cat === activeCategory);
      const incompleteMatch = !showIncompleteOnly || !isChecked(A(a.n));
      return textMatch && catMatch && incompleteMatch;
    });
    document.getElementById('visible-achievements').textContent = `显示 ${filtered.length} / 66 项`;
    document.getElementById('achievement-list').innerHTML = filtered.length ? filtered.map(a => {
      const checked = isChecked(A(a.n));
      const risk = a.risk || a.caution;
      return `<article class="achievement-row ${risk ? 'is-missable' : ''} ${checked ? 'is-checked' : ''}"><input data-check="${A(a.n)}" type="checkbox" ${checked ? 'checked' : ''} aria-label="标记成就完成：${esc(a.title)}"><span class="achievement-icon">${String(a.n).padStart(2,'0')}</span><span><span class="achievement-name">${esc(a.title)}${risk ? ` <em class="badge-inline">${a.risk ? '错过风险' : '安全路线'}</em>` : ''}</span><span class="achievement-desc">${esc(a.desc)}</span></span><span class="achievement-region">${esc(a.area)}</span></article>`;
    }).join('') : '<div class="no-results">没有找到匹配的成就。</div>';
  }

  function updateProgress() {
    const doneAchievements = achievements.filter(a => isChecked(A(a.n))).length;
    const achievementPercent = Math.round(doneAchievements / achievements.length * 100);
    document.getElementById('achievement-fraction').textContent = `${doneAchievements} / ${achievements.length}`;
    document.getElementById('achievement-percent').textContent = `${achievementPercent}%`;
    document.getElementById('achievement-bar').style.width = `${achievementPercent}%`;

    const knownIds = new Set();
    gates.forEach(g => knownIds.add(G(g.id)));
    regions.forEach(r => {
      r.achievements.forEach(n => knownIds.add(A(n)));
      r.tales.forEach(([name]) => knownIds.add(Q(name)));
      r.treasures.forEach(name => knownIds.add(`treasure:${name}`));
      r.objects.forEach((_,i) => knownIds.add(`object:${r.id}:${i}`));
      knownIds.add(`sweep:${r.id}`);
    });
    mysteries.forEach((_,i) => knownIds.add(`mystery:${i}`));
    specialSets.forEach(set => set.items.forEach(([id]) => knownIds.add(id)));
    const finishedCounts = globalThresholds.filter(([key,,target]) => Number(state.counts[`global:${key}`] || 0) >= target).length;
    const routeDone = Array.from(knownIds).filter(id => isChecked(id)).length + finishedCounts;
    const routeTotal = knownIds.size + globalThresholds.length;
    const routePercent = routeTotal ? Math.round(routeDone / routeTotal * 100) : 0;
    document.getElementById('route-fraction').textContent = `${routeDone} / ${routeTotal}`;
    document.getElementById('route-percent').textContent = `${routePercent}%`;
    document.getElementById('route-bar').style.width = `${routePercent}%`;

    document.querySelectorAll('[data-check]').forEach(input => {
      const checked = isChecked(input.dataset.check);
      if (input.checked !== checked) input.checked = checked;
      const row = input.closest('.check-row');
      if (row) row.classList.toggle('is-checked',checked);
      const achievementRow = input.closest('.achievement-row');
      if (achievementRow) achievementRow.classList.toggle('is-checked',checked);
    });
    regions.forEach(r => {
      const card = document.getElementById(r.id);
      if (!card) return;
      const regionDone = r.achievements.filter(n => isChecked(A(n))).length;
      const progress = card.querySelector('.region-progress-mini');
      if (progress) progress.textContent = `成就 ${regionDone}/${r.achievements.length}`;
    });
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'),2800);
  }

  function refreshAfterCheck() {
    persist();
    renderAchievements();
    renderGates();
    renderGlobalChecklist();
    renderRegions(document.getElementById('region-search').value);
    renderFilters();
    updateProgress();
  }

  function exportProgress() {
    const payload = { app:'影之刃零一周目全成就路线簿', version:checklistVersion, exportedAt:new Date().toISOString(), checks:state.checks, counts:state.counts };
    const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `影之刃零-进度备份-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    showToast('进度 JSON 已导出。');
  }

  function importProgress(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(String(reader.result));
        const imported = payload?.checks && payload?.counts ? payload : payload?.state;
        if (!imported || typeof imported.checks !== 'object' || typeof imported.counts !== 'object') throw new Error('格式不符');
        state.checks = { ...state.checks, ...imported.checks };
        state.counts = { ...state.counts };
        Object.entries(imported.counts).forEach(([key,value]) => {
          const n = Number(value);
          if (Number.isFinite(n)) state.counts[key] = Math.max(Number(state.counts[key] || 0),n);
        });
        persist();
        renderGates(); renderGlobalChecklist(); renderRegions(document.getElementById('region-search').value); renderAchievements(); renderFilters(); updateProgress();
        showToast('进度已合并：勾选项合并，计数取较大值。');
      } catch (_) {
        showToast('无法读取此文件。请选择本网站导出的 JSON 备份。');
      }
    };
    reader.readAsText(file);
  }

  function resetProgress() {
    if (!window.confirm('确定清空此浏览器保存的所有勾选与计数吗？建议先导出备份。')) return;
    state = { version:checklistVersion, checks:{}, counts:{}, updatedAt:null };
    persist(); renderGates(); renderGlobalChecklist(); renderRegions(document.getElementById('region-search').value); renderAchievements(); renderFilters(); updateProgress();
    showToast('本机进度已清空。');
  }

  renderGateOverview();
  renderGates();
  renderGlobalChecklist();
  renderRegions();
  renderFilters();
  renderAchievements();
  updateProgress();

  document.addEventListener('change',event => {
    const input = event.target;
    if (input.matches('[data-check]')) {
      state.checks[input.dataset.check] = input.checked;
      refreshAfterCheck();
    }
    if (input.matches('[data-count]')) {
      const id = input.dataset.count;
      const target = Number(input.dataset.target);
      const value = Math.min(target,Math.max(0,Math.floor(Number(input.value) || 0)));
      input.value = String(value);
      state.counts[id] = value;
      persist();
      renderGlobalChecklist(); renderRegions(document.getElementById('region-search').value); updateProgress();
      showToast(`${input.getAttribute('aria-label')}：${value} / ${target}`);
    }
  });
  document.getElementById('region-search').addEventListener('input',event => renderRegions(event.target.value));
  document.getElementById('achievement-search').addEventListener('input',renderAchievements);
  document.getElementById('achievement-filters').addEventListener('click',event => {
    const filter = event.target.closest('[data-filter]');
    const incomplete = event.target.closest('[data-incomplete]');
    if (filter) { activeCategory = filter.dataset.filter; }
    if (incomplete) showIncompleteOnly = !showIncompleteOnly;
    renderFilters(); renderAchievements();
  });
  document.getElementById('toggle-regions').addEventListener('click',event => {
    const cards = [...document.querySelectorAll('.region-card')];
    const shouldOpen = cards.some(card => !card.open);
    cards.forEach(card => { card.open = shouldOpen; });
    event.currentTarget.textContent = shouldOpen ? '全部收起' : '全部展开';
  });
  document.getElementById('export-button').addEventListener('click',exportProgress);
  document.getElementById('import-button').addEventListener('click',() => document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change',event => {
    const file = event.target.files?.[0];
    if (file) importProgress(file);
    event.target.value = '';
  });
  document.getElementById('reset-button').addEventListener('click',resetProgress);
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click',() => {
    document.querySelectorAll('.nav-link').forEach(item => item.classList.toggle('is-active',item === link));
  }));
})();
