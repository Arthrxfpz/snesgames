#!/usr/bin/env python3
"""Le a pasta games/ e cria games/games.json (o catalogo do site)."""
import json, os, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
PASTA = os.path.join(AQUI, "games")
EXT = (".sfc", ".smc", ".swc", ".fig", ".zip")
os.makedirs(PASTA, exist_ok=True)
jogos = []
for raiz, _, arquivos in os.walk(PASTA):
    for nome in sorted(arquivos):
        if nome.lower().endswith(EXT):
            caminho = os.path.join(raiz, nome)
            rel = os.path.relpath(caminho, PASTA).replace(os.sep, "/")
            jogos.append({"file": rel, "size": os.path.getsize(caminho)})
jogos.sort(key=lambda j: j["file"].lower())
with open(os.path.join(PASTA, "games.json"), "w", encoding="utf-8") as f:
    json.dump(jogos, f, ensure_ascii=False, indent=2)
print(f"Catalogo atualizado: {len(jogos)} jogo(s) em games/games.json")
