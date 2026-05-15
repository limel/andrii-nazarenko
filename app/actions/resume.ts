"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { requireSession } from "@/lib/session";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

// ─── Experience ───────────────────────────────────────────────────────────────

export async function createExperience(formData: FormData) {
  await requireSession();
  await sql`
    INSERT INTO experiences (company, domain, role, period, description, achievements, stack, is_current, sort_order)
    VALUES (
      ${formData.get("company")},
      ${formData.get("domain") || null},
      ${formData.get("role")},
      ${formData.get("period")},
      ${formData.get("description")},
      ${parseLines(formData.get("achievements"))},
      ${parseLines(formData.get("stack"))},
      ${formData.get("is_current") === "on"},
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM experiences)
    )
  `;
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function updateExperience(id: number, formData: FormData) {
  await requireSession();
  await sql`
    UPDATE experiences SET
      company = ${formData.get("company")},
      domain = ${formData.get("domain") || null},
      role = ${formData.get("role")},
      period = ${formData.get("period")},
      description = ${formData.get("description")},
      achievements = ${parseLines(formData.get("achievements"))},
      stack = ${parseLines(formData.get("stack"))},
      is_current = ${formData.get("is_current") === "on"}
    WHERE id = ${id}
  `;
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: number) {
  await requireSession();
  await sql`DELETE FROM experiences WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
  await requireSession();
  await sql`
    INSERT INTO projects (name, description, responsibilities, stack, tags, sort_order)
    VALUES (
      ${formData.get("name")},
      ${formData.get("description")},
      ${parseLines(formData.get("responsibilities"))},
      ${parseLines(formData.get("stack"))},
      ${parseLines(formData.get("tags"))},
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM projects)
    )
  `;
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function updateProject(id: number, formData: FormData) {
  await requireSession();
  await sql`
    UPDATE projects SET
      name = ${formData.get("name")},
      description = ${formData.get("description")},
      responsibilities = ${parseLines(formData.get("responsibilities"))},
      stack = ${parseLines(formData.get("stack"))},
      tags = ${parseLines(formData.get("tags"))}
    WHERE id = ${id}
  `;
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: number) {
  await requireSession();
  await sql`DELETE FROM projects WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

export async function createCaseStudy(formData: FormData) {
  await requireSession();
  await sql`
    INSERT INTO case_studies (title, problem, solution, responsibilities, result, stack, tags, sort_order)
    VALUES (
      ${formData.get("title")},
      ${formData.get("problem")},
      ${formData.get("solution")},
      ${parseLines(formData.get("responsibilities"))},
      ${formData.get("result")},
      ${parseLines(formData.get("stack"))},
      ${parseLines(formData.get("tags"))},
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM case_studies)
    )
  `;
  revalidatePath("/");
  revalidatePath("/admin/case-studies");
}

export async function updateCaseStudy(id: number, formData: FormData) {
  await requireSession();
  await sql`
    UPDATE case_studies SET
      title = ${formData.get("title")},
      problem = ${formData.get("problem")},
      solution = ${formData.get("solution")},
      responsibilities = ${parseLines(formData.get("responsibilities"))},
      result = ${formData.get("result")},
      stack = ${parseLines(formData.get("stack"))},
      tags = ${parseLines(formData.get("tags"))}
    WHERE id = ${id}
  `;
  revalidatePath("/");
  revalidatePath("/admin/case-studies");
}

export async function deleteCaseStudy(id: number) {
  await requireSession();
  await sql`DELETE FROM case_studies WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/case-studies");
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

export async function createTechCategory(formData: FormData) {
  await requireSession();
  await sql`
    INSERT INTO tech_categories (name, technologies, sort_order)
    VALUES (
      ${formData.get("name")},
      ${parseLines(formData.get("technologies"))},
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM tech_categories)
    )
  `;
  revalidatePath("/");
  revalidatePath("/admin/tech-stack");
}

export async function updateTechCategory(id: number, formData: FormData) {
  await requireSession();
  await sql`
    UPDATE tech_categories SET
      name = ${formData.get("name")},
      technologies = ${parseLines(formData.get("technologies"))}
    WHERE id = ${id}
  `;
  revalidatePath("/");
  revalidatePath("/admin/tech-stack");
}

export async function deleteTechCategory(id: number) {
  await requireSession();
  await sql`DELETE FROM tech_categories WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/tech-stack");
}

// ─── Expertise ────────────────────────────────────────────────────────────────

export async function createExpertise(formData: FormData) {
  await requireSession();
  await sql`
    INSERT INTO expertise (title, description, icon_svg, icon_viewbox, sort_order)
    VALUES (
      ${formData.get("title")},
      ${formData.get("description")},
      ${formData.get("icon_svg")},
      ${formData.get("icon_viewbox") || "0 0 24 24"},
      (SELECT COALESCE(MAX(sort_order), 0) + 1 FROM expertise)
    )
  `;
  revalidatePath("/");
  revalidatePath("/admin/expertise");
}

export async function updateExpertise(id: number, formData: FormData) {
  await requireSession();
  await sql`
    UPDATE expertise SET
      title        = ${formData.get("title")},
      description  = ${formData.get("description")},
      icon_svg     = ${formData.get("icon_svg")},
      icon_viewbox = ${formData.get("icon_viewbox") || "0 0 24 24"}
    WHERE id = ${id}
  `;
  revalidatePath("/");
  revalidatePath("/admin/expertise");
}

export async function deleteExpertise(id: number) {
  await requireSession();
  await sql`DELETE FROM expertise WHERE id = ${id}`;
  revalidatePath("/");
  revalidatePath("/admin/expertise");
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export async function updateHero(formData: FormData) {
  await requireSession();
  await sql`
    UPDATE hero SET
      name        = ${formData.get("name")},
      role        = ${formData.get("role")},
      badge       = ${formData.get("badge")},
      description = ${formData.get("description")},
      cv_url      = ${formData.get("cv_url")}
    WHERE id = 1
  `;
  revalidatePath("/");
  revalidatePath("/admin/hero");
}

// ─── About ────────────────────────────────────────────────────────────────────

export async function updateAbout(formData: FormData) {
  await requireSession();
  await sql`
    UPDATE about SET
      paragraphs = ${parseLines(formData.get("paragraphs"))}
    WHERE id = 1
  `;
  revalidatePath("/");
  revalidatePath("/admin/about");
}
