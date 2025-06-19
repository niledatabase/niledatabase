#!/usr/bin/env python3
"""
run_guide.py  –  Graph-RAG tour-guide demo
-------------------------------------------------
Usage examples:

  python run_guide.py --list-guides

  python run_guide.py --guide "SurfCo Travel" \
                      --ask   "Where can I surf big waves near San Francisco?"

  python run_guide.py   # interactive prompt
"""
import os, argparse, sys, psycopg2, psycopg2.extras, uuid
from graphrag_core import graphrag_answer

psycopg2.extras.register_uuid()
conn = psycopg2.connect(os.getenv("DATABASE_URL"))

def list_guides() -> dict[str, uuid.UUID]:
    with conn, conn.cursor() as cur:
        cur.execute("SELECT name, id FROM tenants ORDER BY name;")
        return dict(cur.fetchall())

def main():
    parser = argparse.ArgumentParser(description="Ask a question to a tour guide")
    parser.add_argument("--list-guides", action="store_true",
                        help="Show all available guides and exit")
    parser.add_argument("--guide", "-g", metavar="NAME", help="Guide/operator name")
    parser.add_argument("--ask",   "-q", metavar="QUESTION", help="Your question")
    args = parser.parse_args()

    guides = list_guides()
    if args.list_guides:
        for name in guides:
            print("•", name)
        return

    # Interactive fallback
    guide_name = args.guide or input(f"Guide name {tuple(guides)}: ").strip()
    question   = args.ask   or input("Your question: ").strip()

    tenant_id = guides.get(guide_name)
    if tenant_id is None:
        sys.exit(f"Unknown guide '{guide_name}'. Run with --list-guides to see options.")

    answer = graphrag_answer(question, tenant_id)
    print("\n--- Answer ---\n")
    print(answer)
    print("\n--------------")

if __name__ == "__main__":
    main()
