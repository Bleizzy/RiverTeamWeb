const siteColors = {
    accentRgb: "230, 46, 69",
    devStatusRgb: "230, 46, 69",
    planStatusRgb: "139, 92, 246"
};
const projectsData = [
    {
        slug: "they-are-watching-you",
        title: "They are watching you",
        description: "Здесь должен быть крутой заголовок что режим не кал",
        about: "They are watching you - игровой хоррор режим от River Team.",
        genre: "Хоррор",
        version: "В разработке",
        team: ["Nuzhnoe", "Bleizzy", "Sams1k_", "Daswert"],
        gallery: ["img/gamemode/tawy_main.webp"],
        links: [{ label: "Telegram", url: "https://t.me/riverteam_off" }],
        statusText: "В разработке",
        statusRgb: siteColors.devStatusRgb,
        cardRgb: "185, 28, 56",
        image: "img/gamemode/tawy_main.webp",
        link: "project.html?p=they-are-watching-you"
    },
    {
        slug: "employee",
        title: "EMPLOYEE",
        description: "Порт игры от Mr.Fizlex",
        about: "Порт игры от Mr.Fizlex на движок Minecraft.",
        genre: "Хоррор / Порт",
        version: "В разработке",
        team: ["Nuzhnoe", "Bleizzy", "Sams1k_"],
        gallery: ["img/gamemode/emp_main.webp"],
        links: [{ label: "Telegram", url: "https://t.me/riverteam_off" }],
        statusText: "В разработке, финальный этап",
        statusRgb: siteColors.planStatusRgb,
        cardRgb: "111, 145, 201",
        image: "img/gamemode/emp_main.webp",
        link: "project.html?p=employee"
    }
];

const teamData = [
    {
        name: "Nuzhnoe",
        role: "Основатель",
        initials: "Nzh",
        avatar: "img/icons/nuzhnoe.webp",
        rgb: "230, 46, 69"
    },
    {
        name: "Bleizzy",
        role: "Программист, моделлер",
        initials: "Blz",
        avatar: "img/icons/blz_avatar.webp",
        rgb: "139, 92, 246"
    },
    {
        name: "Sams1k_",
        role: "Программист",
        initials: "Samsiki",
        avatar: "img/icons/samsik.webp",
        rgb: "59, 130, 246"
    },
    {
        name: "Daswert",
        role: "Саунд-дизайнер",
        initials: "dsw",
        avatar: "img/icons/daswert.webp",
        rgb: "16, 185, 129"
    }
];

const futureProjectsData = [
    {
        slug: "inked",
        title: "INKED",
        description: "Inded - режим основанный от игры Bendy.",
        statusText: "В планах",
        statusRgb: siteColors.planStatusRgb,
        cardRgb: "111, 145, 201",
        image: "img/gamemode/inked.webp"
    }
];
