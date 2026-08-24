let products = [];

let editingId = null;

const apiVersionSelect = document.getElementById("apiVersion");

const productForm = document.getElementById("productForm");

const productTableBody =
    document.getElementById("productTableBody");

const totalProducts =
    document.getElementById("totalProducts");

const apiVersionLabel =
    document.getElementById("apiVersionLabel");

const databaseMethod =
    document.getElementById("databaseMethod");

const databaseDescription =
    document.getElementById("databaseDescription");

const currentEndpoint =
    document.getElementById("currentEndpoint");

const submitButton =
    document.getElementById("submitButton");

apiVersionSelect.addEventListener("change", () => {
    updateApiInformation();

    resetForm();

    loadProducts();
});

function getBaseUrl() {
    return `/api/${apiVersionSelect.value}/products`;
}

function updateApiInformation() {

    const version = apiVersionSelect.value;

    if (version === "v1") {

        apiVersionLabel.textContent = "V1";

        databaseMethod.textContent = "Native";

        databaseDescription.textContent =
            "MongoDB Native Driver";

    } else {

        apiVersionLabel.textContent = "V2";

        databaseMethod.textContent = "Mongoose";

        databaseDescription.textContent =
            "Mongoose ODM";
    }

    currentEndpoint.textContent =
        getBaseUrl();
}

async function loadProducts() {

    try {

        productTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    Memuat data...
                </td>
            </tr>
        `;

        const response =
            await fetch(getBaseUrl());

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal mengambil data"
            );
        }

        products = result.data || [];

        totalProducts.textContent =
            products.length;

        renderProducts();

    } catch (error) {

        productTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    ${escapeHtml(error.message)}
                </td>
            </tr>
        `;

    }
}

function renderProducts() {

    if (products.length === 0) {

        productTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    Belum ada product.
                </td>
            </tr>
        `;

        return;
    }

    productTableBody.innerHTML =
        products.map((product, index) => {

            const status =
                product.status !== false;

            const image =
                product.image_url
                    ? `
                        <img
                            src="${escapeAttribute(product.image_url)}"
                            class="product-image"
                            alt="${escapeAttribute(product.name)}"
                        >
                    `
                    : "";

            return `
                <tr>

                    <td class="text-center">
                        ${index + 1}
                    </td>

                    <td>
                        ${image}
                        <span class="product-name">
                            ${escapeHtml(product.name)}
                        </span>
                    </td>

                    <td>
                        Rp ${Number(product.price).toLocaleString("id-ID")}
                    </td>

                    <td>
                        ${product.stock}
                    </td>

                    <td>
                        ${escapeHtml(product.category || "-")}
                    </td>

                    <td>

                        <span
                            class="badge ${
                                status
                                    ? "badge-active"
                                    : "badge-inactive"
                            }"
                        >
                            ${status ? "Aktif" : "Tidak Aktif"}
                        </span>

                    </td>

                    <td>

                        <div class="action-group">

                            <button
                                class="btn btn-edit"
                                onclick="editProduct('${product._id}')"
                            >
                                Edit
                            </button>

                            <button
                                class="btn btn-danger"
                                onclick="deleteProduct('${product._id}')"
                            >
                                Hapus
                            </button>

                        </div>

                    </td>

                </tr>
            `;

        }).join("");
}

productForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const data = {

        name: document
            .getElementById("name")
            .value
            .trim(),

        price: Number(
            document.getElementById("price").value
        ),

        stock: Number(
            document.getElementById("stock").value
        ),

        category: document
            .getElementById("category")
            .value
            .trim(),

        status:
            document.getElementById("status").value === "true",

        image_url:
            document.getElementById("image_url").value.trim()
    };

    try {

        let response;

        if (editingId) {

            response = await fetch(
                `${getBaseUrl()}/${editingId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

        } else {

            response = await fetch(
                getBaseUrl(),
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

        }

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Request gagal"
            );
        }

        alert(
            editingId
                ? "Product berhasil diperbarui"
                : "Product berhasil ditambahkan"
        );

        resetForm();

        loadProducts();

    } catch (error) {

        alert(error.message);

    }
});

async function editProduct(id) {

    const product =
        products.find(
            item => String(item._id) === String(id)
        );

    if (!product) {
        return;
    }

    editingId = id;

    document.getElementById("name").value =
        product.name || "";

    document.getElementById("price").value =
        product.price || "";

    document.getElementById("stock").value =
        product.stock || "";

    document.getElementById("category").value =
        product.category || "";

    document.getElementById("status").value =
        product.status === false
            ? "false"
            : "true";

    document.getElementById("image_url").value =
        product.image_url || "";

    submitButton.textContent =
        "Update Product";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function deleteProduct(id) {

    const confirmed =
        confirm(
            "Apakah kamu yakin ingin menghapus product ini?"
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `${getBaseUrl()}/${id}`,
                {
                    method: "DELETE"
                }
            );

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Gagal menghapus product"
            );
        }

        alert("Product berhasil dihapus");

        loadProducts();

    } catch (error) {

        alert(error.message);

    }
}

function resetForm() {

    editingId = null;

    productForm.reset();

    document.getElementById("status").value =
        "true";

    submitButton.textContent =
        "Tambah Product";
}

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
    return escapeHtml(value);
}

updateApiInformation();

loadProducts();