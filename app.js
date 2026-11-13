(() => {
  const STORAGE_KEY = 'pbz-first-run-checklist-v1';
  const checklistVersion = 3;
  const A = (n) => `ach:${String(n).padStart(2, '0')}`;

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
    { n:33, title:'“影”承血，“刃”同源', en:'Phantom and Blade', cat:'side', area:'戏梦山庄', desc:'完成“血脉觉醒”（五根龙柱）。一周目沿途完成，并在最后机会铃铛前确认结算。', areaId:'r8', caution:true },
    { n:34, title:'白山遗烈', en:'The Last of Baishan', cat:'side', area:'血色森林／正道大营', desc:'完成“白山派秘闻”：先在血色森林桥上接取，再推进到正道大营。', areaId:'r5', risk:true },
    { n:35, title:'白首不相离', en:'Together Till the End', cat:'side', area:'庞镇', desc:'完成“归家之旅”。进入庞镇前要接取并完成陆家村阶段。', areaId:'r4', risk:true },
    { n:36, title:'浪子侠心', en:"A Wanderer's Honor", cat:'side', area:'庞镇', desc:'完成“兰家大少”。进入庞镇前要接取并完成陆家村阶段。', areaId:'r4', risk:true },
    { n:37, title:'鬼斩客', en:'Spectral Blade', cat:'side', area:'悲泣溪谷／梅谷湖／断魂山', desc:'完成“断裂的心印”。最迟离开悲泣溪谷前交还第一块原石。', areaId:'r1', risk:true },
    { n:38, title:'杏林有继', en:'The Healer’s Legacy', cat:'side', area:'悲泣溪谷／血色森林', desc:'完成“肉灵芝”“见习医者”“医者仁心”。打静夜前完成药草委托，打白赤练前完成救治与交付。', areaId:'r2', risk:true },
    { n:39, title:'妙手拾遗', en:'Lost and Found', cat:'side', area:'五个区域', desc:'完成全部“妙手空空”委托并交还宝物。建议沿途交付；是否属于硬性错过项，各指南说法不一。', areaId:'r8', caution:true },
    { n:40, title:'草木也知愁', en:'Even Trees Know Sorrow', cat:'side', area:'五个区域', desc:'完成“榕树之心”的五场菩提试炼。攻略普遍认为通关后仍可补。', areaId:'r7' },
    { n:41, title:'神“器”十足', en:'A Tempered Ten', cat:'gear', area:'解锁魂锻后', desc:'为 10 把不同武器各完成一次魂锻。', areaId:'r4' },
    { n:42, title:'一力降十会', en:'Overwhelming Force', cat:'gear', area:'任意区域', desc:'将任意一把武器强化至 30 级。', areaId:'r9' },
    { n:43, title:'珀力非凡', en:'Complete Mastery', cat:'gear', area:'跨区域累计', desc:'收集 10 块煞气琥珀。', areaId:'r6' },
    { n:44, title:'且听花声', en:'Listen to Every Flower', cat:'gear', area:'跨区域累计', desc:'集齐 10 朵完整的记忆之花（不是 10 片花瓣）。', areaId:'r6' },
    { n:45, title:'取石有道', en:'Leave No Stone Unturned', cat:'gear', area:'跨区域累计', desc:'收集 10 块黑石。', areaId:'r6' },
    { n:46, title:'博物杂记', en:'Collector’s Notes', cat:'gear', area:'跨区域累计', desc:'收集 30 件饰品。', areaId:'r6' },
    { n:47, title:'“影”多不压身', en:'Phantom Arsenal', cat:'gear', area:'解锁魂锻后', desc:'为 10 件不同影之武装各完成一次魂锻。', areaId:'r4' },
    { n:48, title:'一巧破百拙', en:'Skill Over Strength', cat:'gear', area:'任意区域', desc:'将任意一件影之武装强化至 30 级。', areaId:'r9' },
    { n:49, title:'“影”之道', en:'Way of the Phantom', cat:'combat', area:'任意区域', desc:'在同一次连续动作中完成连锁暗杀；不限定区域。' },
    { n:50, title:'“刃”之道', en:'Way of the Blade', cat:'combat', area:'任意区域', desc:'在同一次连续动作中完成连锁处决；不限定区域。' },
    { n:51, title:'破伤风之刃', en:'The Rusted Blade', cat:'combat', area:'任意区域', desc:'用“残钢刃”使敌人大出血。先在悲泣溪谷击败痴狂暴徒·残钢取得武器；取得后可在其他区域完成。', pickupAreaId:'r1', pickupAreaLabel:'取残钢刃：悲泣溪谷 ↗' },
    { n:52, title:'醉生梦死', en:'A Drunken Dream', cat:'combat', area:'任意区域', desc:'装备“痴者残剑”进入“大醉”；该剑由血色森林“远眺庞镇之桥”旁的花千笑掉落。', pickupAreaId:'r2', pickupAreaLabel:'取痴者残剑：血色森林 ↗' },
    { n:53, title:'兵不血刃', en:'Bloodless Victory', cat:'combat', area:'任意区域', desc:'装备“灵蛇软剑”，用“后发先至”弹反敌人攻击；不限定区域。', areaId:'r3' },
    { n:54, title:'灭烛见真火', en:'The Flame Within', cat:'combat', area:'任意区域', desc:'取得“炼狱胭脂”后，用它释放“幻刃”；不限定区域。', areaId:'r9' },
    { n:55, title:'渴饮刀头血', en:'The Blade’s Thirst', cat:'combat', area:'任意区域', desc:'取得“亡命斩马刀”后，释放绝技“嗜血狂刃”；不限定区域。', areaId:'r2' },
    { n:56, title:'御雪凝霜', en:'Snow and Frost', cat:'combat', area:'任意区域', desc:'先在梅谷湖击败风雪刀客取得“白影”；之后可在任意区域冻结敌人。', pickupAreaId:'r6', pickupAreaLabel:'取白影：梅谷湖 ↗' },
    { n:57, title:'一刀两断', en:'Cleave in Two', cat:'combat', area:'任意区域', desc:'取得偃月刀后，用“青龙斩”直接斩杀敌人；不限定区域。', areaId:'r4' },
    { n:58, title:'延时爆破', en:'Delayed Blast', cat:'combat', area:'任意区域', desc:'先在陆家村完成沐小葵五条红绳解锁妖锯，再于任意区域触发并引爆“妖气侵蚀”。', pickupAreaId:'r3', pickupAreaLabel:'解锁妖锯：陆家村 ↗' },
    { n:59, title:'环环相扣', en:'Perfectly Linked', cat:'combat', area:'任意区域', desc:'取得“玉双环”后，连续抛出飞环并命中锁定目标；不限定区域。', areaId:'r4' },
    { n:60, title:'白山风雷动', en:'Baishan Tempest', cat:'combat', area:'任意区域', desc:'取得“白山风雷剑”后释放“雷霆风暴”；不限定区域。', areaId:'r5' },
    { n:61, title:'天降金瓜', en:'Heavenfall Strike', cat:'combat', area:'任意区域', desc:'取得“碎颅杆”后，从空中砸中敌人；不限定区域。', areaId:'r5' },
    { n:62, title:'翻江倒海', en:'Turning the Tide', cat:'boss', area:'庞镇＋梅谷湖', desc:'先后击败两次水行帮主：游龙（庞镇和梅谷湖各一战）。', areaId:'r6' },
    { n:63, title:'拳力以赴', en:'Fists of Fury', cat:'combat', area:'任意区域', desc:'取得“铁拳套”后打出“宗师拳”；不限定区域。', areaId:'r5' },
    { n:64, title:'电光石火', en:'Lightning Fast', cat:'combat', area:'任意区域', desc:'取得“雷霆枪”后麻痹敌人；不限定区域。', areaId:'r6' },
    { n:65, title:'无中生友', en:'A Friend from Thin Air', cat:'combat', area:'任意区域', desc:'取得任意召唤类影之武装后召出助战单位；不限定区域。', areaId:'r4' },
    { n:66, title:'逆天改命', en:'Defy Destiny', cat:'completion', area:'完成其余成就后', desc:'解锁其余 65 项 Steam 成就；不绑定特定区域。', areaId:'r9' }
  ];

  const isRegionBound = achievement => ['story','boss','side'].includes(achievement.cat);

  const mysteries = ['谷底深处','因尼斯幻象','煞气船','虚荣的诱惑','幻琵琶','昆仑长柱','哭声从何而来','先驱者幻象','朱宅','湖心秘密','血脉觉醒'];
  const globalThresholds = [
    ['amber10','杀气琥珀',10,'颗'], ['blackstone10','黑石',10,'块'],
    ['flowers10','完整记忆之花',10,'朵'],
    ['weapon-level30','30 级武器',1,'把'], ['edge-level30','30 级影之武装',1,'件']
  ];
  const quantityData = window.pbzQuantityData;
  const quantityGroups = [
    { key:'accessory', title:'饰品', target:30, unit:'件', items:quantityData.accessories, description:'共 66 件可选；任意收集 30 件即可解锁“博物杂记”。每件都列出中文名、所在区域和具体获取位置。' },
    { key:'weapon', title:'魂锻武器', target:10, unit:'把', items:quantityData.weapons, description:'从不同武器中任选 10 把，各完成一次魂锻。只勾选已魂锻的武器；同一把重复魂锻不重复计数。' },
    { key:'edge', title:'魂锻影之武装', target:10, unit:'件', items:quantityData.phantomEdges, description:'从不同影之武装中任选 10 件，各完成一次魂锻。只勾选已魂锻的影之武装；重复魂锻不重复计数。' }
  ];

  const regions = [
    { id:'r1', no:'01', name:'悲泣溪谷', subtitle:'主线起点 · 断裂的心印与第一根龙柱', achievements:[1,2,3,14,15,16,23,37,49,50,51], steps:[
      {id:'mystery:0', label:'完成紫色任务《谷底深处》', note:'开启溪谷下层区域；按任务日志完成。'},
      {id:'route:r1:rusted-blade', label:'击败痴狂暴徒·残钢，取得残钢刃', note:'用于“破伤风之刃”；拿到后可在任意区域对敌人触发“大出血”。'},
      {id:'pillar:valley', label:'完成悲泣溪谷龙柱试炼（1 / 5）', note:'推进《血脉觉醒》；五根龙柱是成就“影承血，刃同源”的必做项。'},
      {id:'gate:accessory:boulderguard', label:'先与前哨营地 NPC 交谈，再检查墓碑', note:'取得错过风险饰品“坚岩护腕”：从斧宗师拘留所铃铛往前，在步道上调查墓碑。', gate:true},
      {id:'gate:accessory:medicine-case', label:'离开溪谷前交齐三种草药', note:'把止血藤、凝脂叶、污秽金草交给玉儿，完成《见习医者》并取得“香薰药盒”。', gate:true},
      {id:'gate:gate-mindseal', label:'交还《断裂的心印》第一块原石', note:'在杀气塔顶与影哨接取，拿到原石后交还。最迟离开悲泣溪谷前；精确触发点未被指南确认。', gate:true}
    ]},
    { id:'r2', no:'02', name:'血色森林', subtitle:'镜林 · 医者与白山派支线截止点', achievements:[4,17,18,38,52,55], steps:[
      {id:'gate:gate-doctor', label:'静夜·亡命战前完成《见习医者》', note:'交付止血藤、凝脂叶、污秽金草给玉儿，并确认药匣任务完成。', gate:true},
      {id:'gate:gate-bai', label:'白赤练战前完成医者与白山派前置', note:'救治四名伤者并回报；击败阿花后交付肉灵芝；与桥上的兰兰接取《白山派秘闻》。按任务日志确认已完成当前阶段。', gate:true},
      {id:'gate:gate-quickhand', label:'救出快手张并接取《妙手空空》', note:'在囚笼处放下吊笼救人，再到盗贼营地与他交谈；“妙手拾遗”需要交齐五个区域的宝物。'},
      {id:'gate:accessory:silent-wrap', label:'答对温柔盗贼的三道问题', note:'取得错过风险饰品“屏息绑带”；选择错误可能失去奖励。', gate:true},
      {id:'mystery:1', label:'完成紫色任务《因尼斯幻象》', note:'从血色森林第一座吊钟附近开始，后续依任务日志推进。'},
      {id:'pillar:crimson', label:'完成血色森林龙柱试炼（2 / 5）', note:'推进《血脉觉醒》。'},
      {id:'banyan:crimson', label:'完成血色森林菩提试炼（1 / 5）', note:'“草木也知愁”需要完成五处菩提试炼。'},
      {id:'treasure:血染封印', label:'快手张宝物：血染封印（1 / 16）'},
      {id:'treasure:宗主鼻烟壶', label:'快手张宝物：宗主鼻烟壶（2 / 16）'},
      {id:'treasure:古弩', label:'快手张宝物：古弩（3 / 16）'},
      {id:'route:r2:handin', label:'交付血色森林三件宝物', note:'到快手张据点交付本区宝物，完成《妙手空空》本区目标。'}
    ]},
    { id:'r3', no:'03', name:'陆家村', subtitle:'进入庞镇前 · 两条可错过支线与湖心秘密起点', achievements:[5,19,53,58], steps:[
      {id:'gate:gate-lu', label:'进入庞镇前接取并推进两条支线', note:'在老根处接《归家之旅》，在兰少爷藏身处接《兰家大少》；完成两条的陆家村首段。成就在庞镇收尾。', gate:true},
      {id:'gate:accessory:arrowward', label:'把《盗贼秘籍》交给门边受伤的盗贼', note:'取得错过风险饰品“避箭护符”；秘籍可在血色森林取得。', gate:true},
      {id:'gate:accessory:agarwood', label:'对庄严僧人选择“不相信”，再交念珠', note:'取得错过风险饰品“沉香念珠”；选择相信会令僧人石化。', gate:true},
      {id:'gate:gate-ribbons', label:'沐小葵战前集齐五条红绳', note:'三偶井、蓝火萤寺、长廊桥、夫人地、井下各一条。五条齐全后再挑战，解锁妖锯与“延时爆破”。', gate:true},
      {id:'route-count:r3:firefly', label:'萤火记忆之花残片', count:{key:'count:r3:firefly', target:6, unit:'片'}, note:'收集 6 片开启《湖心秘密》并进入后续流程。'},
      {id:'route:r3:pipa-start', label:'开启紫色任务《幻琵琶》', note:'本区取得残破琵琶与部件线索，后续在梅谷湖补齐琴弦并交给密斯特修复。'},
      {id:'route:r3:lake-start', label:'开启紫色任务《湖心秘密》', note:'拾取萤火记忆之花花瓣后接取；任务在梅谷湖收尾。'},
      {id:'eye:yang', label:'湖心秘密收集：水晶傀儡眼·阳', note:'朱宅木偶清道夫附近取得。'},
      {id:'eye:yin', label:'湖心秘密收集：水晶傀儡眼·阴', note:'开启朱宅三道幻门并击败三眼人偶后取得。'},
      {id:'mask:yanru', label:'湖心秘密面具：炎如之焰面具（陆家村）'},
      {id:'mask:hansui', label:'湖心秘密面具：寒髓霜面具（朱宅）'},
      {id:'mystery:8', label:'完成紫色任务《朱宅》', note:'在木偶试验场附近取得线索；后续开启三道幻门并交还傀儡之舌。'},
      {id:'mystery:7', label:'完成紫色任务《先驱者幻象》', note:'完成与《朱宅》相连的三道幻门目标。'},
      {id:'ribbon:well', label:'红绳 1 / 5：三偶井'},
      {id:'ribbon:temple', label:'红绳 2 / 5：蓝火萤寺'},
      {id:'ribbon:bridge', label:'红绳 3 / 5：长廊桥'},
      {id:'ribbon:grounds', label:'红绳 4 / 5：夫人地'},
      {id:'ribbon:well-below', label:'红绳 5 / 5：井下'},
      {id:'treasure:婚烛', label:'快手张宝物：婚烛（4 / 16）'},
      {id:'treasure:白玉双生', label:'快手张宝物：白玉双生（5 / 16）'},
      {id:'treasure:未揭雕像', label:'快手张宝物：未揭雕像（6 / 16）'},
      {id:'route:r3:handin', label:'交付陆家村三件宝物', note:'在快手张处完成本区《妙手空空》目标。'}
    ]},
    { id:'r4', no:'04', name:'庞镇', subtitle:'接续陆家村支线 · 真结局谜团的安全截止点', achievements:[6,20,31,35,36,41,47,57,59,62,65], steps:[
      {id:'route:r4:journey-home', label:'完成《归家之旅》与《兰家大少》', note:'接续陆家村已开启的任务，完成两项支线成就。'},
      {id:'gate:accessory:blessed-jade', label:'长鸿战前救下建筑内的老人', note:'取得错过风险饰品“开光玉佩”；需要先在悲泣溪谷取得肉灵芝。', gate:true},
      {id:'gate:accessory:snow-blood', label:'推进白雪儿异闻并检查树下石堆', note:'取得错过风险饰品“雪与血”；互动点在树根石堆处。', gate:true},
      {id:'route:r4:fleshlily', label:'完成《肉灵芝》最后交付', note:'击败张洪后进入前方的玉儿家，将普通肉灵芝交给玉儿的父亲；与血色森林的医者任务合计解锁“杏林有继”。'},
      {id:'mystery:2', label:'完成紫色任务《煞气船》', note:'在庞镇码头向密斯特询问船主，再登上机械船。'},
      {id:'route:r4:kunlun-key', label:'推进《昆仑长柱》并取得正道大营外门钥匙', note:'按紫色任务标记找到庞镇后巷的钥匙，随后到正道大营继续。'},
      {id:'gate:gate-green-door', label:'回到庞镇开青蛇屋前完成前十项紫色谜团', note:'取得三座蛇屋的关键物后，回到庞镇进入戏梦山庄前，确认《谷底深处》《因尼斯幻象》《煞气船》《虚荣的诱惑》《幻琵琶》《昆仑长柱》《哭声从何而来》《先驱者幻象》《朱宅》《湖心秘密》均已完成。', gate:true},
      {id:'banyan:pangzhen', label:'完成庞镇菩提试炼（2 / 5）', note:'“草木也知愁”所需。'},
      {id:'mask:leiting', label:'湖心秘密面具：雷霆面具（庞镇）'},
      {id:'treasure:玉笔刷架', label:'快手张宝物：玉笔刷架（7 / 16）'},
      {id:'treasure:虎形镇纸', label:'快手张宝物：虎形镇纸（8 / 16）'},
      {id:'treasure:墨条', label:'快手张宝物：墨条（9 / 16）'},
      {id:'treasure:刻边砚台', label:'快手张宝物：刻边砚台（10 / 16）'},
      {id:'route:r4:handin', label:'交付庞镇四件宝物', note:'完成本区《妙手空空》目标。'},
      {id:'route:r4:dragon', label:'击败游龙（庞镇首战）', note:'“翻江倒海”需要再击败梅谷湖的游龙。'}
    ]},
    { id:'r5', no:'05', name:'正道大营', subtitle:'白山派收尾 · 菩提试炼', achievements:[8,21,29,34,40,60,61,63], steps:[
      {id:'gate:gate-bi', label:'玉笔战前检查白山派后续目标', note:'吴冷霜战后检查花丛中的毕桃桃遗体；确认日志出现“击败毕桃桃的人偶形态”后再打玉笔。', gate:true},
      {id:'gate:accessory:twin-fish', label:'屋顶遇到红时沿铁链离开，再于大师兄战击败她', note:'取得错过风险饰品“同心双鱼佩”；不要在屋顶把红打到退场。', gate:true},
      {id:'banyan:mandate', label:'完成正道大营菩提试炼（3 / 5）', note:'“草木也知愁”所需。'},
      {id:'mystery:5', label:'完成紫色任务《昆仑长柱》', note:'按任务日志推进并完成枷笼山相关步骤。'}
    ]},
    { id:'r6', no:'06', name:'梅谷湖', subtitle:'湖心秘密收尾 · 面具、傀儡眼与两根龙柱', achievements:[10,25,28,30,31,32,43,44,45,46,56,62,64], steps:[
      {id:'route:r6:mindseal', label:'续做《断裂的心印》第二段', note:'首次到达梅谷湖北侧码头后，沿东侧道路上塔，找到友善影哨并交还第二块原石；最后一块要等断魂山开放、血色森林结冰后再回去。'},
      {id:'mystery:3', label:'完成紫色任务《虚荣的诱惑》', note:'先完成《煞气船》；收集烟儿的记忆之花并击败烟千岁，取得琵琶弦。'},
      {id:'mystery:4', label:'完成紫色任务《幻琵琶》', note:'集齐琵琶头、琴弦、琴背板，再请密斯特修复。'},
      {id:'mystery:9', label:'完成紫色任务《湖心秘密》', note:'集齐四面具与傀儡之眼，完成幻术师遗迹，并在战后与因尼斯对话收尾；“禁法湖底沉”及真结局必需。'},
      {id:'mask:guhe', label:'湖心秘密面具：古河毒面具（梅谷湖）'},
      {id:'route:r6:masks', label:'向四方明镜交付四面具并进入幻术师遗迹', note:'四面具与两颗水晶傀儡眼是《湖心秘密》的必需品。'},
      {id:'route-count:r6:yaner', label:'烟儿的记忆之花', count:{key:'count:r6:yaner', target:6, unit:'朵'}, note:'完成《虚荣的诱惑》需要收集 6 朵。'},
      {id:'pillar:meigu', label:'完成梅谷湖东侧龙柱试炼（3 / 5）', note:'推进“影承血，刃同源”。'},
      {id:'pillar:ruins', label:'完成幻术师遗迹龙柱试炼（4 / 5）', note:'进入冰湖对岸遗迹完成龙柱战。'},
      {id:'banyan:meigu', label:'完成梅谷湖菩提试炼（4 / 5）', note:'“草木也知愁”所需。'},
      {id:'treasure:枯星盘', label:'快手张宝物：枯星盘（11 / 16）'},
      {id:'treasure:无常日晷', label:'快手张宝物：无常日晷（12 / 16）'},
      {id:'treasure:蓝花罗盘', label:'快手张宝物：蓝花罗盘（13 / 16）'},
      {id:'route:r6:handin', label:'交付梅谷湖三件宝物', note:'需在梅谷村据点找快手张交付本区这组。'},
      {id:'route:r6:dragon', label:'击败游龙（梅谷湖再战）', note:'完成“翻江倒海”两场游龙战斗。'}
    ]},
    { id:'r7', no:'07', name:'枷笼山', subtitle:'完成神祠步骤 · 戏梦山庄前最后一处截止点', achievements:[22,30,40], steps:[
      {id:'mystery:6', label:'完成紫色任务《哭声从何而来》', note:'完成枷笼山神祠两段步骤。'},
      {id:'gate:accessory:crude-heart', label:'推进陆三千前置目标后在楼梯顶部与他交谈', note:'取得错过风险饰品“粗糙煌心”；前置包含“翠”目标 3 的无根露。', gate:true},
      {id:'gate:gate-whence', label:'跨桥进入戏梦山庄前完成神祠', note:'完成《哭声从何而来》的两处祭坛目标；跨桥后血色森林五处铃铛会关闭。不同指南对其它支线截止点有分歧，按此安全点处理。', gate:true},
      {id:'banyan:mountain', label:'完成枷笼山菩提试炼（5 / 5）', note:'完成第五处后解锁“草木也知愁”。'},
      {id:'route:r7:bi-feng', label:'击败横刀：毕峰', note:'与梅谷湖的火刀：祝原共同解锁“刀冠双绝”。'}
    ]},
    { id:'r8', no:'08', name:'戏梦山庄', subtitle:'终盘整备 · 最后一根龙柱与快手张收尾', achievements:[7,9,11,24,29,33,39,41,47], steps:[
      {id:'pillar:estate', label:'完成戏梦山庄龙柱试炼（5 / 5）', note:'确认《血脉觉醒》完成，解锁“影承血，刃同源”。'},
      {id:'mystery:10', label:'完成紫色任务《血脉觉醒》', note:'五根龙柱全胜后确认手账任务结算。'},
      {id:'treasure:大将军铜镜', label:'快手张宝物：大将军铜镜（14 / 16）'},
      {id:'treasure:金银香囊', label:'快手张宝物：金银香囊（15 / 16）'},
      {id:'treasure:金云月簪', label:'快手张宝物：金云月簪（16 / 16）'},
      {id:'gate:gate-zhang', label:'在戏梦山庄据点交付最后一组宝物', note:'完成《妙手拾遗》需交还五个区域全部 16 件宝物；最后一组在戏梦山庄交给当地据点的快手张。', gate:true},
      {id:'route:r8:handin', label:'确认快手张委托全部结清', note:'手账中五个区域的《妙手空空》目标均完成，解锁“妙手拾遗”。'}
    ]},
    { id:'r9', no:'09', name:'断魂山', subtitle:'最终头目战前 · 最后机会铃铛', achievements:[12,13,26,27,42,48,54,66], steps:[
      {id:'route:r9:mindseal', label:'完成《断裂的心印》最后交付', note:'断魂山开放且血色森林结冰后，回到血色森林东南塔顶，交还最后一块原石。确认任务结算，解锁“鬼斩客”。'},
      {id:'gate:gate-final', label:'越过“最后机会”前核对真结局条件', note:'确认前十项紫色谜团、《湖心秘密》与《血脉觉醒》均已完成；提示每次都会出现，出现本身不代表已错过。', gate:true},
      {id:'route:r9:true-ending', label:'完成真结局“历历事皆明”', note:'通关后解锁“昭昭心与血”；最后领取“逆天改命”。'}
    ]}
  ];

  let state = loadState();
  let showIncompleteOnly = false;
  let toastTimer;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { version:checklistVersion, checks:{}, counts:{}, updatedAt:null };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') throw new Error('invalid');
      return normalizeState(parsed);
    } catch (_) {
      return { version:checklistVersion, checks:{}, counts:{}, updatedAt:null };
    }
  }

  function normalizeState(source) {
    const next = {
      version:checklistVersion,
      checks:source.checks && typeof source.checks === 'object' ? { ...source.checks } : {},
      counts:source.counts && typeof source.counts === 'object' ? { ...source.counts } : {},
      updatedAt:source.updatedAt || null,
      legacyQuantityMigration:Boolean(source.legacyQuantityMigration)
    };
    if (Number(source.version || 1) < checklistVersion) {
      const migrations = [
        ['accessories30','accessory',quantityData.accessories],
        ['weapon-temper10','weapon',quantityData.weapons],
        ['edge-temper10','edge',quantityData.phantomEdges]
      ];
      migrations.forEach(([oldKey,newKey,items]) => {
        const oldId = `global:${oldKey}`;
        const oldCount = Math.min(items.length,Math.max(0,Math.floor(Number(next.counts[oldId] || 0))));
        for (let i=0;i<oldCount;i++) next.checks[`quantity:${newKey}:${typeof items[i] === 'string' ? String(i+1).padStart(2,'0') : items[i].id}`] = true;
        if (oldCount) next.legacyQuantityMigration = true;
        delete next.counts[oldId];
      });
    }
    return next;
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
  function checkRow(id, label, note = '', badge = '', extraClass = '') {
    const checked = isChecked(id);
    return `<label class="check-row ${checked ? 'is-checked' : ''} ${extraClass}"><input data-check="${esc(id)}" type="checkbox" ${checked ? 'checked' : ''}><span>${esc(label)}${badge ? ` <em class="badge-inline">${esc(badge)}</em>` : ''}${note ? `<small>${esc(note)}</small>` : ''}</span></label>`;
  }

  function renderGlobalChecklist() {
    const thresholds = globalThresholds.map(([key,label,target,unit]) => {
      const id = `global:${key}`;
      const value = Math.min(target,Math.max(0,Number(state.counts[id] || 0)));
      return `<label class="global-count"><span>${esc(label)}<small>成就门槛</small></span><span class="global-count-control"><input type="number" min="0" max="${target}" step="1" inputmode="numeric" data-count="${id}" data-target="${target}" value="${value}" aria-label="${label}进度"><em>/ ${target} ${unit}</em></span></label>`;
    }).join('');
    document.getElementById('global-checklist').innerHTML = `<div class="global-checklist-head"><div><span class="section-kicker">需要累计的成就门槛</span><h3>全程累计数量</h3><p>这里保留其余 5 项数量目标；饰品与两类魂锻请在页面末尾逐项勾选。</p></div><span class="global-checklist-badge">5 项数量目标</span></div><div class="global-threshold-grid">${thresholds}</div>`;
  }

  function quantityId(group,index,item) {
    const suffix = typeof item === 'string' ? String(index+1).padStart(2,'0') : item.id;
    return `quantity:${group}:${suffix}`;
  }

  function regionLinks(regionIds) {
    return regionIds.map(id => {
      const region = regions.find(item => item.id === id);
      return region ? `<a href="#${region.id}" data-region-link="${region.id}" class="quantity-region-link">${esc(region.name)}路线 ↗</a>` : '';
    }).join('');
  }

  function renderAccessory(item) {
    const checked = isChecked(`quantity:accessory:${item.id}`);
    return `<article class="quantity-item ${checked ? 'is-checked' : ''} ${item.missable ? 'is-missable' : ''}">
      <label class="quantity-item-toggle"><input type="checkbox" data-check="quantity:accessory:${esc(item.id)}" ${checked ? 'checked' : ''} aria-label="标记饰品已收集：${esc(item.name)}"><span></span></label>
      <div class="quantity-item-copy"><div class="quantity-item-title">${esc(item.name)}${item.missable ? ' <em class="badge-inline">错过风险</em>' : ''}</div><p>${esc(item.where)}</p><div class="quantity-item-links">${regionLinks([item.region])}</div></div>
    </article>`;
  }

  function renderGearOption(item,index,group) {
    const id = quantityId(group.key,index,item);
    const checked = isChecked(id);
    const name = typeof item === 'string' ? item : item.name;
    const details = typeof item === 'string' ? '' : item.where;
    const regionIds = typeof item === 'string' ? [] : (Array.isArray(item.region) ? item.region : [item.region]);
    return `<article class="quantity-item gear-item ${checked ? 'is-checked' : ''}"><label class="quantity-item-toggle"><input type="checkbox" data-check="${esc(id)}" ${checked ? 'checked' : ''} aria-label="已魂锻：${esc(name)}"><span></span></label><div class="quantity-item-copy"><div class="quantity-item-title">${esc(name)}</div>${details ? `<p>${esc(details)}</p>` : ''}${regionIds.length ? `<div class="quantity-item-links">${regionLinks(regionIds)}</div>` : ''}</div></article>`;
  }

  function renderQuantityChecklists() {
    const accessories = quantityGroups[0];
    const openAccessoryRegions = new Set([...document.querySelectorAll('.quantity-region-card[open]')].map(card => card.dataset.quantityRegion));
    const accessoryCount = accessories.items.filter(item => isChecked(`quantity:accessory:${item.id}`)).length;
    const legacyNote = state.legacyQuantityMigration ? `<div class="migration-note"><span>旧版只记录件数，暂时按顺序转换成了占位勾选。请依据实际物品名称核对：</span><button type="button" class="text-button" id="dismiss-migration-note">我已核对</button></div>` : '';
    const regionMarkup = regions.slice(0,8).map((region,index) => {
      const items = accessories.items.filter(item => item.region === region.id);
      if (!items.length) return '';
      const done = items.filter(item => isChecked(`quantity:accessory:${item.id}`)).length;
      return `<details class="quantity-region-card" data-quantity-region="${region.id}" ${openAccessoryRegions.has(region.id) || (!openAccessoryRegions.size && index === 0) ? 'open' : ''}><summary><span>${esc(region.name)}</span><small>${items.length} 件可选</small><b>${done} / ${items.length}</b></summary><div class="quantity-items">${items.map(renderAccessory).join('')}</div></details>`;
    }).join('');
    const groupMarkup = quantityGroups.map((group,groupIndex) => {
      const count = groupIndex === 0 ? accessoryCount : group.items.filter((item,index) => isChecked(quantityId(group.key,index,item))).length;
      const titleId = `quantity-group-${group.key}`;
      const options = groupIndex === 0 ? `<div class="quantity-region-grid">${regionMarkup}</div>` : `<div class="gear-options-grid">${group.items.map((item,index) => renderGearOption(item,index,group)).join('')}</div>`;
      const optionalText = groupIndex === 0 ? '66 件候选饰品' : `${group.items.length} 件可选装备`;
      return `<section class="quantity-group-card ${groupIndex === 0 ? 'accessory-group-card' : ''}" aria-labelledby="${titleId}"><div class="quantity-group-head"><div><span class="section-kicker">${groupIndex === 0 ? '逐件收集 · 可跳转区域' : '任选不同装备 · 不重复计数'}</span><h3 id="${titleId}">${esc(group.title)}</h3><p>${esc(group.description)}</p></div><div class="quantity-progress-badge"><strong>${count}</strong><span>/ ${group.target} ${esc(group.unit)}</span></div></div><div class="quantity-target-line"><span>成就要求 ${group.target} ${esc(group.unit)}</span><span>${optionalText}</span></div>${groupIndex === 0 && state.legacyQuantityMigration ? legacyNote : ''}${options}</section>`;
    }).join('');
    document.getElementById('quantity-checklist-groups').innerHTML = groupMarkup;
    const dismiss = document.getElementById('dismiss-migration-note');
    if (dismiss) dismiss.addEventListener('click',() => { state.legacyQuantityMigration = false; persist(); renderQuantityChecklists(); });
  }

  function renderRouteSteps(region) {
    return region.steps.map(step => {
      if (step.count) {
        const {key,target,unit} = step.count;
        const value = Math.min(target,Math.max(0,Number(state.counts[key] || 0)));
        return `<label class="count-card route-count"><span class="count-label">${esc(step.label)}<small>本区必需数量</small>${step.note ? `<small>${esc(step.note)}</small>` : ''}</span><span class="count-control"><input type="number" min="0" max="${target}" step="1" inputmode="numeric" data-count="${esc(key)}" data-target="${target}" value="${value}" aria-label="${esc(step.label)}进度"><span>/ ${target} ${esc(unit)}</span></span></label>`;
      }
      return checkRow(step.id, step.label, step.note || '', step.gate ? '错过点 · 本区域截止' : '', step.gate ? 'route-gate' : 'route-step');
    }).join('');
  }

  function renderAchievementsInRegion(region) {
    const rows = achievements.filter(a => region.achievements.includes(a.n));
    return rows.map(a => checkRow(A(a.n), `${String(a.n).padStart(2,'0')} · ${a.title}`, a.desc, a.risk ? '错过风险' : '')).join('');
  }

  function renderRegion(region) {
    const boundAchievements = region.achievements.filter(n => {
      const achievement = achievements.find(a => a.n === n);
      return achievement && isRegionBound(achievement);
    });
    const done = boundAchievements.filter(n => isChecked(A(n))).length;
    const mainAchievements = boundAchievements.filter(n => achievements.find(a => a.n === n)?.cat === 'story');
    const activeAchievements = boundAchievements.filter(n => achievements.find(a => a.n === n)?.cat !== 'story');
    const opened = region.id === 'r1' && !document.querySelector('.region-card[open]');
    const seen = new Set();
    const steps = region.steps.filter(step => { if (seen.has(step.id)) return false; seen.add(step.id); return true; });
    return `<details class="region-card ${steps.some(s=>s.gate) ? 'is-risk' : ''}" id="${region.id}" ${opened ? 'open' : ''}>
      <summary class="region-summary"><span class="region-ordinal">${region.no}</span><span><span class="region-title">${esc(region.name)}</span><span class="region-subtitle">${esc(region.subtitle)}</span></span><span class="region-progress-mini">区域成就 ${done}/${boundAchievements.length}</span><span class="region-chevron">⌄</span></summary>
      <div class="region-body"><div class="region-body-grid"><div class="region-column"><h4>本区必做路线</h4><div class="route-steps">${renderRouteSteps({...region,steps})}</div></div><div class="region-column"><h4>本区解锁成就</h4>${mainAchievements.length ? `<div class="subsection-label">流程推进 · ${mainAchievements.length} 项</div><div class="check-list">${mainAchievements.map(n=>renderAchievementsInRegion({...region,achievements:[n]})).join('')}</div>` : ''}${activeAchievements.length ? `<div class="subsection-label">需要主动完成 · ${activeAchievements.length} 项</div><div class="check-list">${activeAchievements.map(n=>renderAchievementsInRegion({...region,achievements:[n]})).join('')}</div>` : ''}</div></div></div>
    </details>`;
  }

  function renderRegions(query = '') {
    const opened = new Set([...document.querySelectorAll('.region-card[open]')].map(card => card.id));
    const q = query.trim().toLocaleLowerCase();
    const filtered = regions.filter(r => !q || `${r.name} ${r.subtitle} ${r.steps.map(s=>`${s.label} ${s.note||''}`).join(' ')}`.toLocaleLowerCase().includes(q));
    document.getElementById('region-list').innerHTML = filtered.length ? filtered.map(renderRegion).join('') : '<div class="no-results">没有找到匹配的区域或必做项目。</div>';
    document.querySelectorAll('.region-card').forEach(card => { if (opened.has(card.id)) card.open = true; });
    if (!opened.size && !q) { const first = document.getElementById('r1'); if (first) first.open = true; }
    updateProgress();
  }

  function renderFilters() {
    const wrap = document.getElementById('achievement-filters');
    wrap.innerHTML = `<button type="button" class="filter-chip ${showIncompleteOnly ? 'is-active' : ''}" data-incomplete="true" aria-pressed="${showIncompleteOnly}">只看未完成</button>`;
  }

  function achievementRow(a) {
    const checked = isChecked(A(a.n));
    const risk = a.risk || a.caution;
    const location = a.pickupAreaId
      ? `达成：${esc(a.area)} · <a class="achievement-location-link" href="#${a.pickupAreaId}" data-region-link="${a.pickupAreaId}">${esc(a.pickupAreaLabel || '查看装备获取区域 ↗')}</a>`
      : esc(a.area);
    return `<article class="achievement-row ${risk ? 'is-missable' : ''} ${checked ? 'is-checked' : ''}"><input data-check="${A(a.n)}" type="checkbox" ${checked ? 'checked' : ''} aria-label="标记成就完成：${esc(a.title)}"><span class="achievement-icon">${String(a.n).padStart(2,'0')}</span><span><span class="achievement-name">${esc(a.title)}${risk ? ` <em class="badge-inline">${a.risk ? '错过风险' : '安全路线'}</em>` : ''}</span><span class="achievement-desc">${esc(a.desc)}</span></span><span class="achievement-region">${location}</span></article>`;
  }

  function renderAchievements() {
    const query = document.getElementById('achievement-search').value.trim().toLocaleLowerCase();
    const matches = a => {
      const textMatch = !query || `${a.title} ${a.en} ${a.desc} ${a.area}`.toLocaleLowerCase().includes(query);
      return textMatch && (!showIncompleteOnly || !isChecked(A(a.n)));
    };
    const boundFlow = achievements.filter(a => isRegionBound(a) && a.cat === 'story' && matches(a));
    const boundActive = achievements.filter(a => isRegionBound(a) && a.cat !== 'story' && matches(a));
    const unbound = achievements.filter(a => !isRegionBound(a) && matches(a));
    const renderList = (id, list, emptyText) => {
      document.getElementById(id).innerHTML = list.length ? list.map(achievementRow).join('') : `<div class="no-results">${emptyText}</div>`;
    };
    renderList('bound-flow-achievement-list',boundFlow,'没有找到匹配的流程成就。');
    renderList('bound-active-achievement-list',boundActive,'没有找到匹配的区域绑定主动成就。');
    renderList('unbound-achievement-list',unbound,'没有找到匹配的不绑定区域成就。');
    document.getElementById('visible-achievements').textContent = `区域绑定 ${boundFlow.length + boundActive.length} / 41 项 · 不绑定区域 ${unbound.length} / 25 项`;
  }

  function updateProgress() {
    const doneAchievements = achievements.filter(a => isChecked(A(a.n))).length;
    const achievementPercent = Math.round(doneAchievements / achievements.length * 100);
    document.getElementById('achievement-fraction').textContent = `${doneAchievements} / ${achievements.length}`;
    document.getElementById('achievement-percent').textContent = `${achievementPercent}%`;
    document.getElementById('achievement-bar').style.width = `${achievementPercent}%`;
    const knownIds = new Set(achievements.map(a => A(a.n)));
    const countSteps = [];
    regions.forEach(region => region.steps.forEach(step => { if (step.count) countSteps.push(step.count); else knownIds.add(step.id); }));
    const finishedStepCounts = countSteps.filter(({key,target}) => Number(state.counts[key] || 0) >= target).length;
    const finishedCounts = globalThresholds.filter(([key,,target]) => Number(state.counts[`global:${key}`] || 0) >= target).length;
    const finishedQuantityTargets = quantityGroups.filter(group => group.items.filter((item,index) => isChecked(quantityId(group.key,index,item))).length >= group.target).length;
    const routeDone = Array.from(knownIds).filter(id => isChecked(id)).length + finishedCounts + finishedStepCounts + finishedQuantityTargets;
    const routeTotal = knownIds.size + globalThresholds.length + countSteps.length + quantityGroups.length;
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
      const quantityItem = input.closest('.quantity-item');
      if (quantityItem) quantityItem.classList.toggle('is-checked',checked);
    });
    regions.forEach(region => {
      const card = document.getElementById(region.id);
      if (!card) return;
      const boundAchievements = region.achievements.filter(n => {
        const achievement = achievements.find(a => a.n === n);
        return achievement && isRegionBound(achievement);
      });
      const progress = card.querySelector('.region-progress-mini');
      const regionDone = boundAchievements.filter(n => isChecked(A(n))).length;
      if (progress) progress.textContent = `区域成就 ${regionDone}/${boundAchievements.length}`;
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
    renderAchievements(); renderGlobalChecklist(); renderRegions(document.getElementById('region-search').value); renderFilters(); renderQuantityChecklists(); updateProgress();
  }
  function exportProgress() {
    const payload = { app:'影之刃零一周目全成就路线簿', version:checklistVersion, exportedAt:new Date().toISOString(), checks:state.checks, counts:state.counts, legacyQuantityMigration:state.legacyQuantityMigration };
    const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url;
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
        const normalized = normalizeState(imported);
        Object.entries(normalized.checks).forEach(([id,value]) => { state.checks[id] = Boolean(state.checks[id] || value); });
        state.counts = { ...state.counts };
        Object.entries(normalized.counts).forEach(([key,value]) => { const n = Number(value); if (Number.isFinite(n)) state.counts[key] = Math.max(Number(state.counts[key] || 0),n); });
        state.legacyQuantityMigration = state.legacyQuantityMigration || normalized.legacyQuantityMigration;
        persist(); renderAchievements(); renderGlobalChecklist(); renderRegions(document.getElementById('region-search').value); renderFilters(); renderQuantityChecklists(); updateProgress();
        showToast('进度已合并：勾选项合并，计数取较大值。');
      } catch (_) { showToast('无法读取此文件。请选择本网站导出的 JSON 备份。'); }
    };
    reader.readAsText(file);
  }
  function resetProgress() {
    if (!window.confirm('确定清空此浏览器保存的所有勾选与计数吗？建议先导出备份。')) return;
    state = { version:checklistVersion, checks:{}, counts:{}, updatedAt:null, legacyQuantityMigration:false };
    persist(); renderAchievements(); renderGlobalChecklist(); renderRegions(document.getElementById('region-search').value); renderFilters(); renderQuantityChecklists(); updateProgress();
    showToast('本机进度已清空。');
  }

  function openRegionFromHash() {
    const id = location.hash.slice(1);
    if (!regions.some(region => region.id === id)) return;
    const search = document.getElementById('region-search');
    if (search.value && !document.getElementById(id)) { search.value = ''; renderRegions(); }
    const card = document.getElementById(id);
    if (card) card.open = true;
  }

  function updateActiveNav() {
    let id = location.hash.slice(1) || 'route';
    if (regions.some(region => region.id === id)) id = 'route';
    document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('is-active',link.getAttribute('href') === `#${id}`));
  }

  renderGlobalChecklist(); renderRegions(); renderFilters(); renderAchievements(); renderQuantityChecklists(); updateProgress();
  window.addEventListener('hashchange',() => { openRegionFromHash(); updateActiveNav(); });
  openRegionFromHash(); updateActiveNav();
  document.addEventListener('change',event => {
    const input = event.target;
    if (input.matches('[data-check]')) { state.checks[input.dataset.check] = input.checked; refreshAfterCheck(); }
    if (input.matches('[data-count]')) {
      const id = input.dataset.count, target = Number(input.dataset.target);
      const value = Math.min(target,Math.max(0,Math.floor(Number(input.value) || 0)));
      input.value = String(value); state.counts[id] = value; persist(); renderGlobalChecklist(); updateProgress();
      showToast(`${input.getAttribute('aria-label')}：${value} / ${target}`);
    }
  });
  document.addEventListener('click',event => {
    const link = event.target.closest('[data-region-link]');
    if (!link) return;
    const id = link.dataset.regionLink;
    const search = document.getElementById('region-search');
    if (search.value && !document.getElementById(id)) { search.value = ''; renderRegions(); }
    const card = document.getElementById(id);
    if (card) card.open = true;
    setTimeout(() => card?.scrollIntoView({behavior:'smooth',block:'start'}),30);
  });
  document.getElementById('region-search').addEventListener('input',event => renderRegions(event.target.value));
  document.getElementById('achievement-search').addEventListener('input',renderAchievements);
  document.getElementById('achievement-filters').addEventListener('click',event => {
    const incomplete = event.target.closest('[data-incomplete]');
    if (incomplete) showIncompleteOnly = !showIncompleteOnly;
    renderFilters(); renderAchievements();
  });
  document.getElementById('toggle-regions').addEventListener('click',event => {
    const cards = [...document.querySelectorAll('.region-card')], shouldOpen = cards.some(card => !card.open);
    cards.forEach(card => { card.open = shouldOpen; }); event.currentTarget.textContent = shouldOpen ? '全部收起' : '全部展开';
  });
  document.getElementById('export-button').addEventListener('click',exportProgress);
  document.getElementById('import-button').addEventListener('click',() => document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change',event => { const file = event.target.files?.[0]; if (file) importProgress(file); event.target.value = ''; });
  document.getElementById('reset-button').addEventListener('click',resetProgress);
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click',updateActiveNav));
})();
