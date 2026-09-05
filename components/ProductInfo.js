import { formatPrice } from "../utils/formatPrice.js";
import { ProductSizeSelector } from "./ProductSizeSelector.js";
import { ProductColorSelector } from "./ProductColorSelector.js";

export function ProductInfo(product) {
  const rating = Number(product.rating ?? 0).toFixed(1);

  const fullStars = Math.floor(product.rating ?? 0);

  const reviews = product.reviews ?? 0;

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  const inStock = product.quantity > 0;

  return `
    <div class="flex flex-col gap-6">

      <!-- Product Title -->

      <div>

        <h1
          id="product-name"
          class="font-montserrat text-4xl font-semibold text-dark">

          ${product.name}

        </h1>

        <div class="flex items-center gap-3 mt-3 flex-wrap">

          <p
            id="product-price"
            class="text-2xl font-semibold text-[#B88E2F]">

            ${formatPrice(product.price)}

          </p>

          ${hasDiscount
      ? `
            <span class="text-lg text-gray-400 line-through">

              ${formatPrice(product.oldPrice)}

            </span>
          `
      : ""
    }

          ${product.discount
      ? `
            <span
              class="bg-red-500 text-white text-xs px-3 py-1 rounded-full">

              ${product.discount}

            </span>
          `
      : ""
    }

        </div>

      </div>

      <!-- Rating -->

      <div class="flex items-center gap-4">

        <div class="flex text-[#FFC700] text-lg">

          ${Array.from({ length: 5 })
      .map(
        (_, index) => `
                <span class="${index < fullStars ? "" : "opacity-30"
          }">★</span>
              `
      )
      .join("")}

        </div>

        <span class="text-gray-300">|</span>

        <span class="text-sm text-gray-500">

          ${rating} (${reviews} Reviews)

        </span>

      </div>

      <!-- Description -->

      <p class="text-[#6F6F6F] leading-7">

        ${product.description ??
    "Premium quality furniture crafted with modern design and long-lasting materials."
    }

      </p>

      <!-- Stock -->

      <div>

        <span class="text-sm font-medium">

          Availability :

        </span>

        <span class="${inStock ? "text-green-600" : "text-red-500"
    } font-semibold">

          ${inStock ? "In Stock" : "Out Of Stock"}

        </span>

      </div>

      <!-- Size -->

      <div>

        <h4 class="text-sm text-gray-500 mb-3">

          Size

        </h4>

        ${ProductSizeSelector(product)}

      </div>

      <!-- Color -->

      <div>

        <h4 class="text-sm text-gray-500 mb-3">

          Color

        </h4>

        ${ProductColorSelector(product)}

      </div>

      <!-- Actions -->

      <div class="flex flex-wrap items-center gap-4 pt-3">

        <!-- Quantity -->

        <div
          class="flex items-center border rounded-xl overflow-hidden border-gray-300">

          <button
            id="decrease-qty"
            type="button"
            class="w-12 h-12 hover:bg-gray-100 transition cursor-pointer">
            −
          </button>

          <input
            id="qty-input"
            value="1"
            readonly
            class="w-14 text-center outline-none font-medium" />

          <button
            id="increase-qty"
            type="button"
            class="w-12 h-12 hover:bg-gray-100 transition cursor-pointer">
            +
          </button>

        </div>

        <!-- Cart -->

        <button
          id="add-to-cart-btn"
          class="px-8 h-12 rounded-xl border border-gray-300 hover:border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white cursor-pointer transition">

          Add To Cart

        </button>

        <!-- Compare -->

        <button
          id="compare-btn"
          class="px-8 h-12 rounded-xl border border-gray-300 hover:border-[#B88E2F] hover:text-[#B88E2F] cursor-pointer transition">
          + Compare
        </button>
      </div>
    </div>
  `;
}