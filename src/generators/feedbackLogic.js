// Modular segments for dynamic combination (STRICTLY for 'needs' group)
const ACTION_RESULTS = {
  needs: [
    '演示了安防监控画面',
    '讲解了智能穿戴用法',
    '测算全家通信总支出',
    '推介了专属礼包方案',
    '演示了智能屏操作流程'
  ]
};

const ATTITUDES = [
  '用户表示正在考虑中。',
  '用户当场同意并办理。',
  '用户称需与家人商量。',
  '用户反馈服务非常周到。',
  '用户表示后期再行联系。'
];

export const categories = [
  // --- 服务受理 (service) ---
  {
    id: 'fault_repair',
    label: '故障维修',
    group: 'service',
    templates: [
      '网络故障已排查，重启光猫后恢复正常使用。',
      '更换室内受损线缆，当前网速测试已达标。',
      '现场配置路由器参数，网络连接已完全恢复。',
      '重做水晶头接口，线路连接目前非常稳定。',
      '建议用户更换千兆路由器以获得更佳网速。'
    ]
  },
  {
    id: 'routine_visit',
    label: '日常上门',
    group: 'service',
    templates: [
      '定期服务回访上门，检查光猫及路由运行正常。',
      '日常维护上门，协助用户理顺室内杂乱线缆。',
      '送装小礼物上门，回访用户对近期网速的评价。',
      '日常巡检上门，优化用户WiFi信道，提升稳定性。'
    ]
  },
  {
    id: 'repair_fault_new',
    label: '故障处理',
    group: 'service',
    templates: [
      '装维上门维修，排查发现皮线受损，现已修复。',
      '上门处理故障，更换损坏的电源适配器，网络正常。',
      '排查室内弱电箱，解决接触不良导致的频繁掉线。',
      '现场测试下行速率，确认主干光纤正常，修复冷接头。'
    ]
  },
  {
    id: 'install_broadband',
    label: '装宽带',
    group: 'service',
    templates: [
      '装维人员上门装宽带，完成布线并调测路由器. ',
      '新装用户，协助安装IPTV并演示高清选台操作。',
      '宽带安装完成，现场测速达标，用户签字确认。',
      '协助新装用户绑定小翼管家，交代使用注意事项。'
    ]
  },

  // --- 业务营销 (sales) ---
  {
    id: 'success_package',
    label: '成功办理',
    group: 'sales',
    templates: [
      '成功推荐升级5G包，用户对此资费表示满意。',
      '新办全屋WiFi业务，现场测试信号覆盖良好。',
      '成功办理额外流量包，业务已即时生效处理。',
      '用户升级千兆融合套餐，手续已在现场办结。'
    ]
  },
  {
    id: 'business_opportunity',
    label: '发现商机',
    group: 'sales',
    templates: [
      '发现用户有监控需求，推荐办理天翼看家。',
      '用户咨询FTTR组网，具备高价值业务潜力。',
      '由于近期孩子上网课，及时推介了宽带提速。'
    ]
  },

  // --- 跟进记录 (status) ---
  {
    id: 'considering',
    label: '考虑中',
    group: 'status',
    templates: [
      '用户目前还在考虑中，已备注下周再次回访。',
      '对比多种套餐方案，目前处于犹豫未决状态。',
      '表示需与家人商量，暂未在现场签署协议。'
    ]
  },
  {
    id: 'follow_up',
    label: '后续服务',
    group: 'status',
    templates: [
      '承诺明日进行电话回访，关注用户网速情况。',
      '已成功添加用户微信，后续提供远程指导。',
      '引导用户加入社群，后续关注服务使用体验。'
    ]
  },

  // --- 问题痛点 (issues) ---
  {
    id: 'speed_low',
    label: '网速不够',
    group: 'issues',
    templates: [
      '现场实测网速仅为100M，建议用户提速至千兆。',
      '用户反馈网速慢，经测速确认未达标，需扩容。',
      '对比用户套餐带宽，实测值偏低，需排查线路。'
    ]
  },
  {
    id: 'wifi_wall',
    label: 'Wifi穿透差',
    group: 'issues',
    templates: [
      '用户反馈卧室WiFi穿透力差，信号仅有一格。',
      '墙体过厚导致WiFi覆盖严重不足，建议加装从路由。',
      '实测次卧存在信号盲区，现有WiFi穿透能力有限。'
    ]
  },
  {
    id: 'data_lack',
    label: '流量足不足',
    group: 'issues',
    templates: [
      '用户手机流量经常超出，正在省着用，推荐升档。',
      '每月流量结余极少，用户担心超出扣费，需优化。',
      '用户语音通话分钟数不足，建议加入全家桶套餐。'
    ]
  },

  // --- 需求挖掘 (needs) ---
  {
    id: 'need_security',
    label: '安防需求',
    group: 'needs',
    contextPrefix: '评估家庭安防需求，',
    templates: [
      '用户有看家护院需求，成功推荐安装智能摄像头。',
      '向用户演示天翼看家回放功能，用户对此很感兴趣。'
    ]
  },
  {
    id: 'need_child',
    label: '儿童需求',
    group: 'needs',
    contextPrefix: '关注儿童用网安全，',
    templates: [
      '家长关注孩子安全，成功推荐办理智能儿童手表。',
      '用户为孩子网课需求，办理了小度智能屏等设备。'
    ]
  },
  {
    id: 'need_elderly',
    label: '老人需求',
    group: 'needs',
    contextPrefix: '聚焦老人健康监护，',
    templates: [
      '关注老人健康，推荐将智能血压计接入智慧家庭。',
      '向用户介绍老人专用血压计，数据可同步至手机查看。'
    ]
  },

  // --- 拒办原因 (rejection) ---
  {
    id: 'satisfied',
    label: '现状满意',
    group: 'rejection',
    templates: [
      '用户对现有套餐使用情况表示满意，暂无更改现状的意愿。',
      '反馈目前手机流量和通话分钟数均够用，不需要升级。',
      '用户习惯现有资费模式，对新推出的套餐持观望态度。',
      '客户当前套餐剩余流量/通话时长充足，暂无需调整。',
      '客户暂无通信消费升级需求，维持现有套餐即可。'
    ]
  },
  {
    id: 'expensive',
    label: '价格嫌贵',
    group: 'rejection',
    templates: [
      '用户反馈套餐月费超出预算，更倾向于低门槛的资费方案。',
      '对比当前消费水平，用户认为提速降费力度不足，决定暂不办理。',
      '用户对价格较为敏感，希望能有针对老用户的专属折扣方案。',
      '客户认为套餐资费过高，超出预算。'
    ]
  },
  {
    id: 'complex',
    label: '内容太杂',
    group: 'rejection',
    templates: [
      '用户表示新套餐包含的内容过于繁杂，目前未能完全理解其优势。',
      '对于流量、合约、赠送业务的组合感到困惑，反馈还是简单的资费更透明。',
      '用户反馈没有精力研究复杂的资费细则，要求提供更直观的对比。',
      '客户对套餐内容不理解，觉得复杂。'
    ]
  },
  {
    id: 'competitor',
    label: '已办竞品',
    group: 'rejection',
    templates: [
      '用户近期已办理了异网的宽带/宽带套餐，处于合约期内无法迁入。',
      '反馈副卡或家人使用的是竞争对手套餐，为了全家桶优惠选择继续留存。',
      '用户由于工作要求或特定优惠，目前主要使用异网号码。',
      '客户近期已办理其他运营商套餐。'
    ]
  },
  {
    id: 'distrust',
    label: '营销不信',
    group: 'rejection',
    templates: [
      '用户对“免费、优惠”等词汇存在抵触心理，认为可能存在后续隐性逻辑。',
      '由于此前有过类似的营销体验，用户对限时优惠的真实性持怀疑态度。',
      '反馈营销电话过多，对推销此类业务持防御及排斥情绪。',
      '客户对“免费升级”“限时优惠”等营销话术不信任。'
    ]
  },
  {
    id: 'trapped',
    label: '担心陷阱',
    group: 'rejection',
    templates: [
      '用户担心套餐升级后有隐藏扣费，或涉及到长期的合约限制。',
      '反馈合同条款中关于违约金及取消比例的细节不明确，不敢轻易尝试。',
      '用户对流量超额后的阶梯收费标准表示忧率，担心产生高额欠费。',
      '客户担心隐藏扣费或合同陷阱。'
    ]
  },
  {
    id: 'identity',
    label: '身份存疑',
    group: 'rejection',
    templates: [
      '由于是上门/电话推销，用户对工作人员的官方身份验证存在疑虑。',
      '反馈担心是不法分子冒充电信业务员，故拒绝提供个人信息及办理。',
      '用户坚持要求去营业厅现场确认，不接受非固定网点的现场办理。',
      '客户对推销人员身份存疑，缺乏信任。'
    ]
  },
  {
    id: 'busy',
    label: '时间仓促',
    group: 'rejection',
    templates: [
      '上门沟通时用户正忙于家务/工作，表示目前无法静下心来了解业务。',
      '由于赶时间出门，用户简短拒绝了沟通，建议换个时间联系。',
      '反馈近期家中琐事较多，没有时间处理通信套餐相关的变更。',
      '客户时间匆忙，不愿详细沟通。'
    ]
  },
  {
    id: 'brand_bad',
    label: '品牌印象',
    group: 'rejection',
    templates: [
      '用户对本区域的信号覆盖或响应速度有负面评价，品牌忠诚度较低。',
      '反馈周边邻居对电信服务的评价一般，因此对新业务尝试动力不足。',
      '由于品牌调性或历史印象，用户对电信作为第一选择持保留意见。',
      '客户对电信运营商品牌印象不佳。'
    ]
  },
  {
    id: 'complaint',
    label: '投诉未结',
    group: 'rejection',
    templates: [
      '用户此前反映的问题尚未得到圆满解决，负面情绪较大，拒绝任何推销。',
      '反馈之前的宽带报障处理周期过长，对现有的管理水平表示不满。',
      '用户由于资费误差或扣费争议正在申诉中，表示不处理好现状不谈新业务。',
      '客户此前有过投诉未解决，心存不满。'
    ]
  },
  {
    id: 'low_usage',
    label: '需求极低',
    group: 'rejection',
    templates: [
      '用户手机仅用于接收验证码或极少量通话，现有最低配套餐已足够。',
      '反馈手机不怎么联网，日常都在WiFi环境下，对流量包完全没需求。',
      '属于纯保号用户，对任何增加支出的业务变更均不予考虑。',
      '客户仅需保号，无流量或通话需求。'
    ]
  },
  {
    id: 'churn_plan',
    label: '转网规划',
    group: 'rejection',
    templates: [
      '客户近期有转网规划，暂不考虑当前运营商的套餐。'
    ]
  },
  {
    id: 'value_added_reject',
    label: '增值业务无感',
    group: 'rejection',
    templates: [
      '客户对套餐附带的增值业务（如视频会员、增值服务）不感兴趣。'
    ]
  },
  {
    id: 'mismatch',
    label: '需求不匹配',
    group: 'rejection',
    templates: [
      '客户使用需求变更（如更换设备后套餐不匹配），暂不适用当前套餐。'
    ]
  },
  {
    id: 'bad_reputation',
    label: '体验预期差',
    group: 'rejection',
    templates: [
      '客户听闻该套餐实际体验较差，不愿尝试办理。'
    ]
  },
  {
    id: 'bad_experience',
    label: '历史避坑',
    group: 'rejection',
    templates: [
      '客户此前办理过同类套餐踩坑，对该类型套餐抵触。'
    ]
  },
  {
    id: 'contract_worry',
    label: '合约顾虑',
    group: 'rejection',
    templates: [
      '客户对套餐的合约期 / 有效期过长存在顾虑。'
    ]
  },
  {
    id: 'anti_push',
    label: '反感推销',
    group: 'rejection',
    templates: [
      '客户反感主动推销，希望自主选择套餐。'
    ]
  },
  {
    id: 'elderly_rejection',
    label: '老年专项拒办',
    group: 'rejection',
    templates: [
      '老人退休后收入以固定退休金为主，每月通信预算有限，觉得套餐资费超出了自己的常规消费范围。',
      '老人日常仅用套餐的基础通话功能，流量 / 增值服务几乎不用，认为高价套餐是 “花冤枉钱买用不上的东西”。',
      '老人对比自己早年使用的低价老年专项套餐，觉得当前套餐资费涨幅过高，无法适应价格变化。',
      '老人对套餐的 “资费 - 权益” 换算不清晰，只直观觉得月费数字比自己能接受的价格高，直接判定太贵。',
      '老人是家庭副卡用户，觉得主套餐分摊到自己的资费部分过高，不如单独办低价老年卡划算。',
      '老人担心套餐除了明标资费外，还有自己看不懂的隐性扣费，叠加后实际支出会更高，因此觉得资费 “虚高不安全”。',
      '老人习惯了节俭的消费模式，认为通信属于 “刚需低价项”，高价套餐不符合自己的消费观念。',
      '老人日常通话对象少（多是子女、老邻居），每月通话时长很短，高价套餐的资源完全过剩，觉得资费不值。',
      '老人听身边同龄亲友说某运营商的老年专属套餐更便宜，对比后觉得当前套餐资费没有优势。',
      '老人近期有其他生活支出增加（如医疗、养老开销），通信资费的小幅上涨也会让他觉得超出负担。',
      '老人对 “套餐升级后资费上涨” 的逻辑不理解，只看到月费变高，直接认为是 “变相加价”，不愿接受。',
      '老人使用的是老年机，无法使用套餐内的流量、智能服务等权益，觉得花高价办套餐 “亏了”。'
    ]
  },
  {
    id: 'elderly_vigilance',
    label: '老年门禁警惕',
    group: 'rejection',
    templates: [
      '老人对陌生人员上门催录门禁的行为高度警惕，怀疑对方不是正规运营商员工，担心是冒充身份的诈骗人员。',
      '老人觉得催录门禁和套餐绑定是 “强制搭售”，警惕办理后会被偷偷升级高价套餐、增加额外资费。',
      '老人警惕录门禁需要提供身份证、家庭住址等隐私信息，担心这些信息被泄露或用于其他违规用途。',
      '催录门禁的节奏太急促，老人觉得 “事出反常必有妖”，警惕背后藏着隐藏合约、自动扣费等陷阱。',
      '老人曾听过 “录门禁送套餐” 实则是长期合约陷阱的传闻，对此类捆绑推销的警惕性极高，怕被套牢。',
      '老人担心录完门禁后，运营商会以此为借口频繁上门推销其他高价业务，不堪其扰。',
      '老人对录门禁的操作流程完全不了解，警惕自己在不知情的情况下被诱导签署套餐变更协议，导致资费上涨。',
      '老人认为门禁录入是小区物业的职责，运营商主动催录不合常理，警惕这只是变相推销套餐的手段。',
      '老人对 “录门禁免费升级套餐” 的话术不信任，觉得天上不会掉馅饼，警惕后续会以各种理由涨资费。',
      '老人担心录门禁后，套餐会自动续约或升级，自己年纪大不懂如何取消，后续会产生高额不必要的费用。',
      '老人看到催录门禁时还要求绑定银行卡代扣，警惕是为了套取支付信息，后续会莫名扣费。',
      '老人的子女反复叮嘱过要警惕上门推销，因此对催录门禁 + 套餐推荐的组合行为直接抵触，怕给家人添麻烦。'
    ]
  }
];

export const GROUPS = {
  service: '服务受理',
  sales: '业务营销',
  rejection: '拒办原因',
  status: '跟进记录',
  issues: '问题痛点',
  needs: '需求挖掘',
  profiles: '用户画像'
};

export function generateFeedback(selectedCategories, count = 5, oldFeedback = '', importCategory = '') {
  let pool = categories.filter(c => selectedCategories.includes(c.id));
  if (pool.length === 0) return [];

  const results = [];
  for (let i = 0; i < count; i++) {
    const cat = pool[Math.floor(Math.random() * pool.length)];
    
    let template = '';
    // Modular combination ONLY for 'needs' group
    if (cat.group === 'needs' && cat.contextPrefix) {
      const context = cat.contextPrefix;
      const actions = ACTION_RESULTS.needs;
      const action = actions[Math.floor(Math.random() * actions.length)];
      const attitude = ATTITUDES[Math.floor(Math.random() * ATTITUDES.length)];
      
      template = `${context}${action}，${attitude}`;
    } else {
      // Use fixed templates for all other groups
      template = cat.templates[Math.floor(Math.random() * cat.templates.length)];
    }
    
    // Heuristic for "improvement"
    if (oldFeedback && oldFeedback.length > 2) {
      const prefixes = ['已根据反馈补充：', '针对此前的问题：', '经现场核实记录：', '结合用户诉求补充：'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      template = prefix + template;
    }
    
    results.push(template);
  }

  // Ensure unique results and filter by length
  return Array.from(new Set(results))
    .filter(r => r.length >= 10)
    .slice(0, count);
}
