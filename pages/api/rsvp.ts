/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/features/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await connectDB();
    const { id, term } = req.query;

    // ── GET ─────────────────────────────────────────────
    if (req.method === "GET") {
      // GET BY ID
      if (id) {
        if (!/^\d+$/.test(id as string)) {
          return res.status(400).json({
            status: false, code: "400",
            message: "Invalid RSVP ID.", data: null,
          });
        }

        const [rows]: any = await db.query(
          "SELECT * FROM rsvp WHERE id = ?",
          [Number(id)]
        );

        if (rows.length === 0) {
          return res.status(404).json({
            status: false, code: "404",
            message: "RSVP not found.", data: null,
          });
        }

        return res.status(200).json({
          status: true, code: "200",
          message: "Success get RSVP by ID.",
          data: rows[0],
        });
      }

      // GET ALL
      const page = parseInt(req.query.page as string, 10) || 1;
      const page_size = parseInt(req.query.page_size as string, 10) || 25;

      const validatedPage = page < 1 ? 1 : page;
      const validatedPageSize = page_size < 1 || page_size > 100 ? 25 : page_size;
      const offset = (validatedPage - 1) * validatedPageSize;

      let whereClause = "";
      const params: any[] = [];

      if (term && typeof term === "string") {
        whereClause = "WHERE nama LIKE ?";
        params.push(`%${term}%`);
      }

      const [countRows]: any = await db.query(
        `SELECT COUNT(*) as total_data FROM rsvp ${whereClause}`,
        params
      );

      const total_data = Number(countRows[0].total_data);

      const [rows]: any = await db.query(
        `SELECT * FROM rsvp ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`,
        [...params, validatedPageSize, offset]
      );

      const total_page = Math.max(Math.ceil(total_data / validatedPageSize), 1);

      return res.status(200).json({
        status: true, code: "200",
        message: "Success get RSVP list.",
        data: {
          items: rows,
          pagination: {
            page: validatedPage,
            page_size: validatedPageSize,
            total_page,
            total_data,
            current_page: rows.length > 0 ? validatedPage : 0,
            current_data: rows.length,
          },
        },
      });
    }

    // ── POST ────────────────────────────────────────────
    if (req.method === "POST") {
      const { nama, grup, whatsapp, komentar, kehadiran } = req.body;

      if (!nama || typeof nama !== "string") {
        return res.status(400).json({
          status: false, code: "400",
          message: "nama is required.", data: null,
        });
      }

      const [result]: any = await db.query(
        `INSERT INTO rsvp (nama, grup, whatsapp, komentar, kehadiran, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [
          nama.trim(),
          grup?.trim() || null,
          whatsapp?.trim() || null,
          komentar?.trim() || null,
          kehadiran || "Hadir", // ✅ FIX: default "Hadir" bukan "kehadiran"
        ]
      );

      const [rows]: any = await db.query(
        "SELECT * FROM rsvp WHERE id = ?",
        [result.insertId]
      );

      return res.status(201).json({
        status: true, code: "201",
        message: "RSVP created successfully.",
        data: rows[0],
      });
    }

    // ── PUT ─────────────────────────────────────────────
    if (req.method === "PUT") {
      if (!id || !/^\d+$/.test(id as string)) {
        return res.status(400).json({
          status: false, code: "400",
          message: "Valid RSVP ID is required.", data: null,
        });
      }

      const { nama, grup, whatsapp, komentar, kehadiran } = req.body;

      if (!nama || typeof nama !== "string") {
        return res.status(400).json({
          status: false, code: "400",
          message: "nama is required.", data: null,
        });
      }

      const [result]: any = await db.query(
        `UPDATE rsvp SET nama = ?, grup = ?, whatsapp = ?, komentar = ?, kehadiran = ?
         WHERE id = ?`,
        [
          nama.trim(),
          grup?.trim() || null,
          whatsapp?.trim() || null,
          komentar?.trim() || null,
          kehadiran || "Hadir", // ✅ FIX: default "Hadir" bukan "kehadiran"
          Number(id),
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false, code: "404",
          message: "RSVP not found.", data: null,
        });
      }

      return res.status(200).json({
        status: true, code: "200",
        message: "RSVP updated successfully.",
        data: null,
      });
    }

    // ── DELETE ──────────────────────────────────────────
    if (req.method === "DELETE") {
      if (!id || !/^\d+$/.test(id as string)) {
        return res.status(400).json({
          status: false, code: "400",
          message: "Valid RSVP ID is required.", data: null,
        });
      }

      const [result]: any = await db.query(
        "DELETE FROM rsvp WHERE id = ?",
        [Number(id)]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: false, code: "404",
          message: "RSVP not found.", data: null,
        });
      }

      return res.status(200).json({
        status: true, code: "200",
        message: "RSVP deleted successfully.",
        data: null,
      });
    }

    // ── METHOD NOT ALLOWED ──────────────────────────────
    return res.status(405).json({
      status: false, code: "405",
      message: "Method not allowed.", data: null,
    });

  } catch (error: any) {
    console.error("RSVP API Error:", error);
    return res.status(500).json({
      status: false, code: "500",
      message: "Internal server error.", data: null,
    });
  }
}