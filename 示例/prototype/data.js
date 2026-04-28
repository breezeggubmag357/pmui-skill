window.AppData = {
  // === 用户数据 ===
  currentUser: {
    id: 'U001',
    name: '小明同学',
    avatar: '',
    phone: '138****6789',
    isVip: true,
    vipLevel: 2,
    balance: 328.50,
    points: 2680,
    couponCount: 5,
    orderCount: 12,
    collectCount: 8,
    signDays: 3
  },

  // === 分类数据 ===
  categories: [
    { id: 'C01', name: '数码家电', icon: '📱', count: 236 },
    { id: 'C02', name: '服装鞋包', icon: '👗', count: 512 },
    { id: 'C03', name: '美妆护肤', icon: '💄', count: 189 },
    { id: 'C04', name: '食品生鲜', icon: '🍎', count: 324 },
    { id: 'C05', name: '家居日用', icon: '🏠', count: 278 },
    { id: 'C06', name: '母婴玩具', icon: '🧸', count: 156 },
    { id: 'C07', name: '运动户外', icon: '⚽', count: 198 },
    { id: 'C08', name: '图书文具', icon: '📚', count: 142 }
  ],

  // === 轮播图 ===
  banners: [
    { id: 'B01', title: '春季焕新季', subtitle: '全场低至3折起', color: '#FF6B6B' },
    { id: 'B02', title: '数码狂欢节', subtitle: '爆款直降500元', color: '#4ECDC4' },
    { id: 'B03', title: '新品首发', subtitle: '抢先体验新品', color: '#45B7D1' }
  ],

  // === 商品数据 ===
  products: [
    { id: 'P001', title: 'Apple AirPods Pro 2 无线蓝牙耳机 主动降噪', category: '数码家电', price: 1599, originalPrice: 1899, sales: 12580, rating: 4.9, reviewCount: 3680, tags: ['自营', '爆款'], img: '🎧', specs: ['白色', '黑色'] },
    { id: 'P002', title: '优衣库 男装 圆领T恤 纯棉短袖 休闲基础款', category: '服装鞋包', price: 79, originalPrice: 99, sales: 8920, rating: 4.7, reviewCount: 2150, tags: ['热卖'], img: '👕', specs: ['S', 'M', 'L', 'XL', 'XXL'] },
    { id: 'P003', title: '兰蔻小黑瓶精华肌底液 50ml 修护保湿', category: '美妆护肤', price: 799, originalPrice: 1080, sales: 5630, rating: 4.8, reviewCount: 1890, tags: ['大牌', '正品保障'], img: '✨', specs: ['30ml', '50ml', '75ml'] },
    { id: 'P004', title: '智利进口车厘子 JJ级 2斤装 新鲜水果', category: '食品生鲜', price: 89.9, originalPrice: 129.9, sales: 15680, rating: 4.6, reviewCount: 4230, tags: ['产地直发', '次日达'], img: '🍒', specs: ['2斤装', '4斤装'] },
    { id: 'P005', title: '小米智能台灯 Pro 护眼LED书桌灯', category: '家居日用', price: 169, originalPrice: 249, sales: 7890, rating: 4.8, reviewCount: 1560, tags: ['智能', '护眼'], img: '💡', specs: ['白色'] },
    { id: 'P006', title: '乐高积木 城市系列 消防站拼装玩具', category: '母婴玩具', price: 399, originalPrice: 499, sales: 3450, rating: 4.9, reviewCount: 890, tags: ['益智', '热卖'], img: '🧱', specs: ['标准版'] },
    { id: 'P007', title: 'Nike Air Max 270 气垫跑步鞋 男女同款', category: '运动户外', price: 699, originalPrice: 999, sales: 6780, rating: 4.7, reviewCount: 2340, tags: ['正品', '爆款'], img: '👟', specs: ['39', '40', '41', '42', '43', '44'] },
    { id: 'P008', title: '得力文具套装 学生用品礼盒 包邮', category: '图书文具', price: 39.9, originalPrice: 69.9, sales: 23450, rating: 4.5, reviewCount: 5670, tags: ['包邮', '超值'], img: '✏️', specs: ['基础款', '豪华款'] },
    { id: 'P009', title: '华为 MatePad Pro 12.6英寸 平板电脑', category: '数码家电', price: 3999, originalPrice: 4699, sales: 4560, rating: 4.9, reviewCount: 1230, tags: ['新品', '自营'], img: '📲', specs: ['8+128G', '8+256G', '12+256G'] },
    { id: 'P010', title: '三只松鼠坚果大礼包 混合坚果 1.36kg', category: '食品生鲜', price: 99, originalPrice: 158, sales: 34560, rating: 4.7, reviewCount: 8920, tags: ['年货', '超值'], img: '🥜', specs: ['1.36kg', '2.04kg'] },
    { id: 'P011', title: '戴森 V12 无线吸尘器 智能除尘', category: '家居日用', price: 3990, originalPrice: 4990, sales: 2340, rating: 4.8, reviewCount: 670, tags: ['大牌', '新品'], img: '🧹', specs: ['银灰色'] },
    { id: 'P012', title: 'ZARA 女装 连衣裙 碎花印花 2026春季新款', category: '服装鞋包', price: 299, originalPrice: 499, sales: 4560, rating: 4.6, reviewCount: 1340, tags: ['新品', '春装'], img: '👗', specs: ['XS', 'S', 'M', 'L'] }
  ],

  // === 商品评价 ===
  reviews: [
    { id: 'RV01', productId: 'P001', user: '数码达人小王', avatar: '', rating: 5, content: '降噪效果非常好，佩戴舒适，音质清晰，续航也很给力！', images: 2, time: '2026-04-25', likes: 128 },
    { id: 'RV02', productId: 'P001', user: '音乐爱好者', avatar: '', rating: 5, content: '第二次购买了，送给女朋友的，她非常喜欢。连接稳定，延迟低。', images: 0, time: '2026-04-22', likes: 89 },
    { id: 'RV03', productId: 'P001', user: '上班族小李', avatar: '', rating: 4, content: '整体不错，就是价格有点贵。降噪效果确实好，通勤必备。', images: 1, time: '2026-04-18', likes: 56 },
    { id: 'RV04', productId: 'P002', user: '优衣库粉丝', avatar: '', rating: 5, content: '面料舒服，版型好，性价比很高，已经买了好几件不同颜色的了。', images: 0, time: '2026-04-20', likes: 234 },
    { id: 'RV05', productId: 'P002', user: '简约风', avatar: '', rating: 4, content: '质量不错，就是尺码偏大一点，建议买小一号。', images: 0, time: '2026-04-15', likes: 67 }
  ],

  // === 购物车数据 ===
  cartItems: [
    { id: 'CI01', productId: 'P001', spec: '白色', quantity: 1, checked: true },
    { id: 'CI02', productId: 'P004', spec: '2斤装', quantity: 2, checked: true },
    { id: 'CI03', productId: 'P008', spec: '豪华款', quantity: 1, checked: false }
  ],

  // === 收货地址 ===
  addresses: [
    { id: 'A001', name: '小明', phone: '138****6789', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园南路88号腾讯大厦A座12楼', isDefault: true },
    { id: 'A002', name: '小明', phone: '138****6789', province: '广东省', city: '广州市', district: '天河区', detail: '天河路385号太古汇商场', isDefault: false }
  ],

  // === 订单数据 ===
  orders: [
    { id: 'ORD20260425001', items: [{ productId: 'P003', spec: '50ml', quantity: 1, price: 799 }], totalAmount: 799, freight: 0, status: '待收货', statusText: '待收货', createTime: '2026-04-25 14:30', addressId: 'A001' },
    { id: 'ORD20260422002', items: [{ productId: 'P002', spec: 'L', quantity: 2, price: 79 }, { productId: 'P010', spec: '1.36kg', quantity: 1, price: 99 }], totalAmount: 257, freight: 0, status: '已完成', statusText: '已完成', createTime: '2026-04-22 09:15', addressId: 'A001' },
    { id: 'ORD20260418003', items: [{ productId: 'P005', spec: '白色', quantity: 1, price: 169 }], totalAmount: 169, freight: 8, status: '已完成', statusText: '已完成', createTime: '2026-04-18 16:42', addressId: 'A002' },
    { id: 'ORD20260415004', items: [{ productId: 'P007', spec: '42', quantity: 1, price: 699 }], totalAmount: 699, freight: 0, status: '已取消', statusText: '已取消', createTime: '2026-04-15 11:20', addressId: 'A001' }
  ],

  // === 优惠券数据 ===
  coupons: [
    { id: 'CP01', type: '满减', value: 50, threshold: 300, title: '满300减50', desc: '全品类通用', startTime: '2026-04-20', endTime: '2026-05-20', used: false },
    { id: 'CP02', type: '满减', value: 20, threshold: 100, title: '满100减20', desc: '食品生鲜专用', startTime: '2026-04-25', endTime: '2026-05-10', used: false },
    { id: 'CP03', type: '折扣', value: 8.5, threshold: 0, title: '8.5折券', desc: '美妆护肤专用', startTime: '2026-04-15', endTime: '2026-05-15', used: true },
    { id: 'CP04', type: '满减', value: 100, threshold: 500, title: '满500减100', desc: '数码家电专用', startTime: '2026-04-28', endTime: '2026-05-28', used: false },
    { id: 'CP05', type: '免邮', value: 0, threshold: 0, title: '免邮券', desc: '全品类免邮', startTime: '2026-04-20', endTime: '2026-06-20', used: false }
  ],

  // === 收藏数据 ===
  favorites: ['P001', 'P003', 'P009', 'P011'],

  // === 快捷入口 ===
  quickLinks: [
    { name: '限时秒杀', icon: '⚡', page: 'flashSale' },
    { name: '领券中心', icon: '🎫', page: 'couponList' },
    { name: '新人专享', icon: '🎁', page: 'newUser' },
    { name: '充值中心', icon: '💳', page: 'recharge' },
    { name: '品牌馆', icon: '🏷️', page: 'brandHall' },
    { name: '直播好物', icon: '📺', page: 'liveRoom' },
    { name: '积分商城', icon: '🪙', page: 'pointsMall' },
    { name: '更多', icon: '➕', page: 'home' }
  ]
};
