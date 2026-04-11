// ============================================
// LISTA DE INVITADOS — ALE & PRI 2026
// ============================================

const INVITADOS = [

  // --- PAREJAS ---
  { grupo: "Sam-Ele",          personas: ["Sam", "Ele"],        },
  { grupo: "Robert",        personas: ["Robert", "+1"],    },
  { grupo: "Mau-Fabio",          personas: ["Mau", "Fabio"],        },
  { grupo: "Anto-Jhon",          personas: ["Tia Anto", "Tio Jhon"],        },
  { grupo: "Dani-Andrea",          personas: ["Dani", "Andrea"],           },
  { grupo: "Joha-novio",          personas: ["Joha", "Gustavo"],           },
  { grupo: "Fefa-Diego",          personas: ["Fefa", "Diego"],           },
  { grupo: "Jose-Rios",     personas: ["José Ríos", "Daniela"],  },
  { grupo: "Gaby",          personas: ["Gaby", "Novio Gaby"],        },
  { grupo: "Eze-Jean",          personas: ["Tio Ezequiel", "Tia Jeanette"],           },
  
  
  { grupo: "Mama-Papa",     personas: ["Tia Amparo", "Tio Napoleón"],              },
  { grupo: "Pipe-Cami",          personas: ["Pipe", "Cami"],           },
  { grupo: "Luli-Hugo",          personas: ["Luli", "Hugo"],       },
  { grupo: "Dani-Sergio",          personas: ["Dani", "Sergio"],       },
  { grupo: "Pau-Cami",          personas: ["Pau", "Cami"],       },
  { grupo: "Tita-Enano",          personas: ["Tita", "Enano"],           },
  
  { grupo: "Muñe-Marlon",          personas: ["Muñe", "Marlon"],           },
  { grupo: "Carli-Gaby",          personas: ["Carli", "Gaby"],           },
  { grupo: "Gracie-Diego",          personas: ["Gracie Diaz", "Diego Torres"],           },
  { grupo: "Male-Juanse",          personas: ["Male Rivera", "Juanse Avendaño"],           },
  { grupo: "Vale-Pablo",          personas: ["Vale Ortiz", "Pablo Ruiz"],           },
  { grupo: "Manu-Lore",          personas: ["Manu", "Lore"],           },
  { grupo: "Lau-Jose",          personas: ["Lau", "Jose"],           },
  { grupo: "Carito-Jose",          personas: ["Carito", "Jose"],           },
  { grupo: "Chiara-Enric",          personas: ["Chiara", "Enric"],           },
  { grupo: "Sandel-Nani",        personas: ["Sandel", "Nani"],         },
  
  { grupo: "Sara-Pablo",          personas: ["Sara", "Pablo"],           },


  // --- INDIVIDUALES --
  { grupo: "Fabiola Alvarez",       personas: ["Fabiola Alvarez"],        },
  { grupo: "Jhon-Ortiz",    personas: ["Jhon Ortiz"],     },
  { grupo: "Bella",         personas: ["Tia Bella"],          },
  { grupo: "Nacho",         personas: ["Tio Nacho"],          },

  { grupo: "Atun",          personas: ["Atún"],           },
  { grupo: "Ezequiel",      personas: ["Ezequiel"],       },
  
  { grupo: "Sabri",         personas: ["Sabri"],          },
  { grupo: "Samy",          personas: ["Samy"],           },

  { grupo: "Alfonso",       personas: ["Alfonso"],        },
  { grupo: "Leo",           personas: ["Leo"],            },
  { grupo: "Loredana",      personas: ["Loredana"],       },
  

  { grupo: "Cokiii",        personas: ["Cokiii"],         },
  { grupo: "Joel",          personas: ["Joel"],           },
  { grupo: "Guille",        personas: ["Guille"],         },

  { grupo: "Mateo",         personas: ["Mateo"],          },
  
  { grupo: "Pikel",         personas: ["Pikel"],          },
  { grupo: "Antonio",         personas: ["Antonio"],          },
  { grupo: "Mara",         personas: ["Mara"],          },

  
  { grupo: "Joseph",        personas: ["Joseph"],         },
  { grupo: "Vivian",        personas: ["Vivian"],         },
  { grupo: "Dani-Roca",     personas: ["Dani Roca"],      },
  



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
