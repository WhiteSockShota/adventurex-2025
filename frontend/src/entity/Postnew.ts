import type { Post } from './Post';

export const posts: Post[] = [
    {
        nickname: '小李不加班',
        username: '@Li_No_OT',
        content: '终于下班了，感觉身体被掏空...今晚必须得吃顿好的犒劳一下自己。有没有推荐的夜宵？在线等！ #打工人',
        image: '',
        verified: false,
    },
    {
        nickname: 'Alex Chen',
        username: '@alex_codes',
        content: '周末试了下最新的 Vibecoding 框架，配合AI写代码也太顺滑了，它好像真的能理解我想要的功能“氛围”，而不是仅仅看语法。生产力感觉翻倍了，有点神奇。 #vibecoding #dev',
        image: '',
        verified: false,
    },
    {
        nickname: 'Tech Frontier',
        username: '@TechFrontier',
        content: '刚才的新闻发布会看了吗？他们在非侵入式脑机接口上取得了重大突破，延迟和精度都达到了新水平。离“意念打字”成为消费级应用不远了。 #BCI #前沿科技',
        image: '',
        verified: true,
    },
    {
        nickname: '喵星人观察员',
        username: '@CatWatcher',
        content: '我家主子今天又解锁了新睡姿，真是个液体做的猫。 #每日吸猫',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop', // A generic cat photo
        verified: false,
    },
    {
        nickname: '旅行的意义',
        username: '@TravelJunkie',
        content: '大理的云真的看不腻，随便一拍就是一张壁纸。在这里时间都变慢了。 #云南旅游 #治愈',
        image: 'https://images.unsplash.com/photo-1587095951499-78c3a6a5f85c?q=80&w=2070&auto=format&fit=crop', // A generic travel photo
        verified: false,
    },
    {
        nickname: '电影爱好者',
        username: '@MovieFanatic',
        content: '刚看完新上映的那部悬疑片，反转再反转，结尾直接惊呆了！强烈推荐，绝对值回票价！ #电影推荐',
        image: '',
        verified: false,
    },
    {
        nickname: '吃货本货',
        username: '@Foodie_Me',
        content: '这家新开的日料店真的绝了，海胆寿司入口即化，幸福感爆棚！已经决定下周再来刷一次菜单。',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1964&auto=format&fit=crop', // A generic food photo
        verified: false,
    },
    {
        nickname: '官方新闻',
        username: '@OfficialNews',
        content: '提醒广大市民，本周末市中心将举行马拉松比赛，部分路段将实行交通管制，请提前规划好出行路线。',
        image: '',
        verified: true,
    }
];