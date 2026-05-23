const WP_URL = "https://juliaguillen.com";
const KEY = "ck_56c44123a06f9e5e7b92671cc9d1def6a31002f3";
const SECRET = "cs_478509d2b0196ea6c805ef4081a3dc02f6de456f";

const auth = Buffer.from(`${KEY}:${SECRET}`).toString("base64");

async function testConnection() {
  console.log("--- INICIANDO DIAGNÓSTICO DE WOOCOMMERCE ---");
  console.log(`Intentando conectar a: ${WP_URL}/wp-json/wc/v3/products`);
  
  try {
    const response = await fetch(`${WP_URL}/wp-json/wc/v3/products?per_page=5`, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (NextJS Headless Client)"
      }
    });

    console.log(`\nCódigo de Estado HTTP: ${response.status} ${response.statusText}`);
    
    // Print response headers (to diagnose hosting firewalls or Cloudflare blocks)
    console.log("\nCabeceras de Respuesta:");
    console.log(`- Server: ${response.headers.get("server")}`);
    console.log(`- Content-Type: ${response.headers.get("content-type")}`);
    console.log(`- X-Robots-Tag: ${response.headers.get("x-robots-tag")}`);
    
    const text = await response.text();
    
    if (response.ok) {
      console.log("\n¡CONEXIÓN EXITOSA!");
      try {
        const json = JSON.parse(text);
        console.log(`\nSe encontraron ${json.length} productos.`);
        console.log("Primeros productos en tu WordPress:");
        json.forEach(p => {
          console.log(`- [ID ${p.id}]: ${p.name} ($${p.price})`);
        });
      } catch (e) {
        console.log("La respuesta no es JSON válido:", text.slice(0, 300));
      }
    } else {
      console.log("\n¡ERROR DE AUTENTICACIÓN / SERVIDOR!");
      console.log("Cuerpo de la respuesta del servidor WordPress:");
      console.log(text.slice(0, 800));
    }
  } catch (error) {
    console.log("\n¡ERROR DE RED / CONEXIÓN IMPOSIBLE!");
    console.log(error);
  }
}

testConnection();
