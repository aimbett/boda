// ============================================
// LISTA DE INVITADOS — ALE & PRI 2026
// ============================================

const INVITADOS = [

  // --- PAREJAS ---
  { grupo: "Mama-Papa",     personas: ["Mamá", "Papá"],             mesa: "" },
  { grupo: "Robert",        personas: ["Robert", "Novio Robert"],   mesa: "" },
  { grupo: "Jose-Rios",     personas: ["José Ríos", "Esposa José"], mesa: "" },
  { grupo: "Luli",          personas: ["Luli", "Esposo Luli"],      mesa: "" },
  { grupo: "Gaby",          personas: ["Gaby", "Novio Gaby"],       mesa: "" },

  // --- INDIVIDUALES ---
  { grupo: "Sam",           personas: ["Sam"],           mesa: "" },
  { grupo: "Ele",           personas: ["Ele"],           mesa: "" },
  { grupo: "Mauro",         personas: ["Mauro"],         mesa: "" },
  { grupo: "Fabio",         personas: ["Fabio"],         mesa: "" },
  { grupo: "Anto",          personas: ["Anto"],          mesa: "" },
  { grupo: "Jhon",          personas: ["Jhon"],          mesa: "" },
  { grupo: "Jhon-Ortiz",    personas: ["Jhon Ortiz"],    mesa: "" },
  { grupo: "Bella",         personas: ["Bella"],         mesa: "" },
  { grupo: "Nacha",         personas: ["Nacha"],         mesa: "" },
  { grupo: "Dani",          personas: ["Dani"],          mesa: "" },
  { grupo: "Andrea",        personas: ["Andrea"],        mesa: "" },
  { grupo: "Fefa",          personas: ["Fefa"],          mesa: "" },
  { grupo: "Diego",         personas: ["Diego"],         mesa: "" },
  { grupo: "Atun",          personas: ["Atún"],          mesa: "" },
  { grupo: "Ezequiel",      personas: ["Ezequiel"],      mesa: "" },
  { grupo: "Tia-Jean",      personas: ["Tía Jean"],      mesa: "" },
  { grupo: "Sabri",         personas: ["Sabri"],         mesa: "" },
  { grupo: "Sany",          personas: ["Sany"],          mesa: "" },
  { grupo: "Alfonso",       personas: ["Alfonso"],       mesa: "" },
  { grupo: "Leo",           personas: ["Leo"],           mesa: "" },
  { grupo: "Loredana",      personas: ["Loredana"],      mesa: "" },
  { grupo: "Cokiii",        personas: ["Cokiii"],        mesa: "" },
  { grupo: "Joel",          personas: ["Joel"],          mesa: "" },
  { grupo: "Joha",          personas: ["Joha"],          mesa: "" },
  { grupo: "Guille",        personas: ["Guille"],        mesa: "" },
  { grupo: "Alvarez",       personas: ["Álvarez"],       mesa: "" },
  { grupo: "Pipe",          personas: ["Pipe"],          mesa: "" },
  { grupo: "Comi",          personas: ["Comi"],          mesa: "" },
  { grupo: "Mune",          personas: ["Muñe"],          mesa: "" },
  { grupo: "Marlon",        personas: ["Marlon"],        mesa: "" },
  { grupo: "Tita",          personas: ["Tita"],          mesa: "" },
  { grupo: "Jose-Bernardo", personas: ["José Bernardo"], mesa: "" },
  { grupo: "Carli",         personas: ["Carli"],         mesa: "" },
  { grupo: "Gracie",        personas: ["Gracie"],        mesa: "" },
  { grupo: "Male",          personas: ["Male"],          mesa: "" },
  { grupo: "Mateo",         personas: ["Mateo"],         mesa: "" },
  { grupo: "Vale",          personas: ["Vale"],          mesa: "" },
  { grupo: "Sandel",        personas: ["Sandel"],        mesa: "" },
  { grupo: "Pikel",         personas: ["Pikel"],         mesa: "" },
  { grupo: "Sara",          personas: ["Sara"],          mesa: "" },
  { grupo: "Pablo",         personas: ["Pablo"],         mesa: "" },
  { grupo: "Manu",          personas: ["Manu"],          mesa: "" },
  { grupo: "Lore",          personas: ["Lore"],          mesa: "" },
  { grupo: "Lau",           personas: ["Lau"],           mesa: "" },
  { grupo: "Jose",          personas: ["Jose"],          mesa: "" },
  { grupo: "Joseph",        personas: ["Joseph"],        mesa: "" },
  { grupo: "Vivian",        personas: ["Vivian"],        mesa: "" },
  { grupo: "Dani-Roca",     personas: ["Dani Roca"],     mesa: "" },
  { grupo: "Jose2",         personas: ["Jose"],          mesa: "" },
  { grupo: "Carito",        personas: ["Carito"],        mesa: "" },
  { grupo: "Enric",         personas: ["Enric"],         mesa: "" },
  { grupo: "Chiara",        personas: ["Chiara"],        mesa: "" },

];

// ============================================
// GENERADOR DE LINKS — abre consola del
// navegador (F12) para ver todos los links
// ============================================
function generarLinks(base) {
  const url = base || window.location.origin + window.location.pathname;
  console.log("\n🐾 LINKS DE INVITACIÓN — ALE & PRI\n");
  INVITADOS.forEach(inv => {
    const personas = inv.personas.join(",");
    const link = `${url}?grupo=${encodeURIComponent(inv.grupo)}&personas=${encodeURIComponent(personas)}`;
    console.log(`👥 ${inv.personas.join(" & ")}`);
    console.log(`   ${link}\n`);
  });
}

if (typeof window !== 'undefined') {
  window.INVITADOS = INVITADOS;
  window.generarLinks = generarLinks;
}
