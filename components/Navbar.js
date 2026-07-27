const NAV_LINKS = Object.freeze([
  { id: "home", label: "Home", href: "../../pages/home/home.html" },
  { id: "shop", label: "Shop", href: "../../pages/shop/shop.html" },
  { id: "blog", label: "Blogs", href: "../../pages/blog/blog.html" },
  { id: "contact", label: "Contact", href: "../../pages/contact/contact.html" },
]);

const ICON_LINKS = Object.freeze([
  {
    id: "account",
    label: "Account",
    icon: "fa-solid fa-user",
    href: "../../pages/account/account.html",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: "fa-regular fa-heart",
    href: "../../pages/wishlist/wishlist.html",
    badgeId: "wishlist-count",
  },
  {
    id: "cart",
    label: "Cart",
    icon: "fa-solid fa-cart-shopping",
    href: "../../pages/cart/cart.html",
    badgeId: "cart-badge",
  },
]);

function trimClassList(classList) {
  return classList
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}

const TRANSITION_CLASS = `
transition-all
duration-300
ease-in-out
motion-reduce:transition-none
`;

const FOCUS_RING_CLASS = `
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-(--primary)
focus-visible:ring-offset-2
`;

const activeTextClass = (isActive) =>
  isActive
    ? "text-(--primary)"
    : "text-gray-700 hover:text-(--primary)";

const navLinkClass = (isActive) => `
relative
group
inline-flex
items-center
text-[16px]
font-medium
capitalize
select-none
${TRANSITION_CLASS}
${FOCUS_RING_CLASS}
focus-visible:rounded-md
${activeTextClass(isActive)}
`;

const iconLinkClasses = `
relative
flex
items-center
justify-center
size-10
rounded-full
text-[18px]
hover:bg-gray-100
hover:text-(--primary)
hover:scale-105
active:scale-95
select-none
${TRANSITION_CLASS}
${FOCUS_RING_CLASS}
`;

function renderBadge(badgeId) {
  if (!badgeId) return "";

  return `
    <span
      id="${badgeId}"
      class="${trimClassList(`
        absolute
        -top-1
        -right-1
        hidden
        min-w-5
        h-5
        px-1
        items-center
        justify-center
        rounded-full
        bg-red-500
        text-[10px]
        font-semibold
        leading-none
        text-white
        shadow-sm
      `)}"
    >
      0
    </span>
  `;
}

function renderIconLink(
  {
    id,
    label,
    icon,
    href = "#",
    action,
    badgeId,
  },
  activePage
) {
  const isActive = id === activePage;

  const stateClass = isActive
    ? "text-(--primary) bg-gray-100"
    : "";

  const linkClass = trimClassList(`
    ${iconLinkClasses}
    ${stateClass}
  `);

  const content = action
    ? `
      <button
        type="button"
        id="${id}-trigger"
        aria-label="${label}"
        aria-haspopup="true"
        aria-expanded="false"
        title="${label}"
        class="${linkClass}"
      >
        <i
          class="${icon}"
          aria-hidden="true"
        ></i>

        ${renderBadge(badgeId)}
      </button>
    `
    : `
      <a
        href="${href}"
        aria-label="${label}"
        title="${label}"
        ${isActive ? 'aria-current="page"' : ""}
        class="${linkClass}"
      >
        <i
          class="${icon}"
          aria-hidden="true"
        ></i>

        ${renderBadge(badgeId)}
      </a>
    `;

  return `
    <li>
      ${content}
    </li>
  `;
}

export function renderNavbar(activePage = "home") {
  function renderDesktopLinkItem({ id, label, href }) {

    const isActive = id === activePage;

    return `
      <li>

        <a
          href="${href}"
          class="${trimClassList(navLinkClass(isActive))}"
          ${isActive ? 'aria-current="page"' : ""}
        >

          ${label}

          <span
            aria-hidden="true"
            class="${trimClassList(`
              absolute
              left-0
              bottom-0
              h-0.5
              w-full
              origin-left
              bg-current
              transform
              ${TRANSITION_CLASS}
              motion-reduce:transform-none
              ${isActive
        ? "scale-x-100"
        : "scale-x-0 group-hover:scale-x-100"
      }
            `)}"
          ></span>

        </a>

      </li>
    `;
  }


  function renderMobileLinkItem({ id, label, href }) {

    const isActive = id === activePage;

    return `
      <li>

        <a
          href="${href}"

          class="${trimClassList(`
            block
            py-4
            text-lg
            font-medium
            capitalize
            rounded-md
            select-none
            ${TRANSITION_CLASS}
            ${FOCUS_RING_CLASS}
            ${activeTextClass(isActive)}
            ${isActive
        ? "bg-gray-50"
        : "hover:bg-gray-50"
      }
          `)}"

          ${isActive ? 'aria-current="page"' : ""}
        >

          ${label}

        </a>

      </li>
    `;
  }

  return `    <header
      class="
        sticky
        top-0
        z-50
        w-full
        h-[100px]
        border-b
        border-gray-100
        bg-white/95
        backdrop-blur-md
        supports-[backdrop-filter]:bg-white/80
      "
    >
      <div
        class="
          mx-auto
          flex
          h-full
          w-full
          max-w-[1286px]
          items-center
          justify-between
          px-5
          lg:px-8
        "
      >

        <!-- Logo -->
        <a
          href="../../pages/home/home.html"
          aria-label="Furniro Home"
          class="
            flex
            items-center
            gap-2
            select-none
            transition-transform
            duration-300
            hover:scale-[1.02]
          "
        >
          <img
            src="../../assets/images/logo.svg"
            alt="Furniro Logo"
            width="34"
            height="34"
            loading="eager"
            decoding="async"
          />

          <span
            class="
              text-[32px]
              font-bold
              tracking-tight
            "
          >
            Furniro
          </span>

        </a>

        <!-- Desktop Navigation -->

        <nav aria-label="Main navigation">
          <ul class="hidden items-center
              gap-12 lg:flex">
            ${NAV_LINKS.map(renderDesktopLinkItem).join("")}
          </ul>
        </nav>

        <!-- Right Actions -->

        <div
          class="
            flex
            items-center
            gap-3
            md:gap-5">

          <ul class="flex
              items-center
              gap-2
              md:gap-4">
            ${ICON_LINKS.map(item => renderIconLink(item, activePage)).join("")}
          </ul>

          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mobile-menu-panel"
            class="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              transition-all
              duration-300
              hover:bg-gray-100
              hover:text-(--primary)
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-(--primary)
              md:hidden">
            <i class="fa-solid fa-bars"
              aria-hidden="true"></i>
          </button>

        </div>

      </div>

      <!-- Mobile Menu -->

      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        tabindex="-1"
        inert
        class="
          fixed
          inset-0
          top-[100px]
          z-40
          bg-white
          opacity-0
          pointer-events-none
          translate-y-4
          transition-all
          duration-300
          ease-out
          md:hidden
        "
      >

        <nav
          aria-label="Mobile navigation"
          class="
            h-full
            overflow-y-auto
            px-6
            py-6
          "
        >

          <ul
            class="
              divide-y
              divide-gray-100
            "
          >
            ${NAV_LINKS.map(renderMobileLinkItem).join("")}
          </ul>

        </nav>

      </div>

    </header>

  `;
}