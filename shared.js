$(document).ready(function () {
    const gifts = [
        {
            id: "gift1",
            file: "index.html",
            title: "🎁 Gift #1: The Beginning",
            footer: "Birthday Gift #1 For Anne Antoine Lorent!"
        },
        {
            id: "gift2",
            file: "gift2.html",
            title: "💝 Gift #2: Postcard",
            footer: "Birthday Gift #2 For Anne Antoine Lorent!"
        },
        {
            id: "gift3",
            file: "gift3.html",
            title: "✨ Gift #3: Recipes!",
            footer: "Birthday Gift #3 For Anne Antoine Lorent!"
        },
        {
            id: "gift4",
            file: "gift4.html",
            title: "🎵 Gift #4: A Final Message",
            footer: "Birthday Gift #4 For Anne Antoine Lorent!"
        },
        {
            id: "gift5",
            file: "gift5.html",
            title: "❓ Gift #5: Work In Progress",
            footer: "Yes, I am indeed being very secretive Anne. (Sorry I couldn't finish this yet! expect it to be done by tomorrow or 20/08/2026)"
        }
    ];

    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const currentIndex = gifts.findIndex(gift => gift.file === currentFile);
    const currentGift = currentIndex >= 0 ? gifts[currentIndex] : null;
    
    const showNavLinks = currentFile !== "index.html";

    const navigation = `
        <header>
            <nav class="nav" aria-label="Main Navigation">
                <ul>
                    <li><span class="nav-logo">ATIF-ANNE 2026</span></li>
                    
                    ${showNavLinks ? `
                        <li><a href="index.html">HOME</a></li>
                        <li><a href="#" id="prev-btn">PREVIOUS</a></li>
                        <li><a href="#" id="next-btn">NEXT</a></li>
                    ` : ""}
                    
                    <li>
                        <button class="burger-menu" id="burger-toggle" aria-label="Open Gift Menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>

        <div class="menu-overlay" id="menu-panel">
            <button class="close-menu" id="menu-close" aria-label="Close Gift Menu">&times;</button>

            <div class="overlay-content">
                <h2>Navigation Center</h2>
                <div class="menu-divider"></div>

                <ul>
                    ${gifts.map(gift => `
                        <li>
                            <a href="${gift.file}" class="menu-link ${currentGift?.id === gift.id ? "active-gift" : ""}">
                                ${gift.title}
                            </a>
                        </li>
                    `).join("")}
                </ul>
            </div>
        </div>
    `;

    $("body").prepend(navigation);

    if (currentGift) {
        $("body").append(`
            <footer>
                <p>${currentGift.footer}</p>
            </footer>
        `);
    }

    if (showNavLinks) {
        $("#prev-btn").on("click", function (e) {
            e.preventDefault();
            if (currentIndex > 0) {
                window.location.href = gifts[currentIndex - 1].file;
            }
        });

        $("#next-btn").on("click", function (e) {
            e.preventDefault();
            if (currentIndex < gifts.length - 1) {
                window.location.href = gifts[gifts.indexOf(currentGift) + 1].file;
            }
        });
    }

    $("#burger-toggle").on("click", function (e) {
        e.preventDefault();
        $("#menu-panel").addClass("open");
    });

    $("#menu-close").on("click", function (e) {
        e.preventDefault();
        $("#menu-panel").removeClass("open");
    });

    $(document).on("click", function (event) {
        if (!$(event.target).closest("#menu-panel, #burger-toggle").length) {
            $("#menu-panel").removeClass("open");
        }
    });
});
