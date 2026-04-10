// ============================================
//   LISTA DE INVITADOS — ALE & PRI 2026
//   Edita este archivo para agregar grupos
// ============================================

const INVITADOS = [

  // --- FAMILIA ---
  {
    grupo: "Familia-Garcia",
    personas: ["María García", "Carlos García", "Sofía García"],
    mesa: "Familia"
  },
  {
    grupo: "Familia-Lopez",
    personas: ["Roberto López", "Ana López"],
    mesa: "Familia"
  },

  // --- AMIGOS ---
  {
    grupo: "Amigos-Universidad",
    personas: ["Diego Martínez", "Luisa Martínez"],
    mesa: "Amigos"
  },
  {
    grupo: "Amigos-Trabajo",
    personas: ["Paula Sánchez"],
    mesa: "Amigos"
  },

  // --- EJEMPLO: cómo agregar más ---
  // {
  //   grupo: "Nombre-Unico-Sin-Espacios",
  //   personas: ["Nombre Apellido", "Nombre Apellido"],
  //   mesa: "Familia" // o "Amigos", o lo que quieran
  // },

];

// ============================================
//   GENERADOR DE LINKS — abre consola del
//   navegador (F12) para ver todos los links
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
