import {integer,sqliteTable,text} from "drizzle-orm/sqlite-core";
export const submissions=sqliteTable("submissions",{
 studentId:text("student_id").primaryKey(),
 enteredAt:text("entered_at").notNull(),
 submittedAt:text("submitted_at"),
 progress:integer("progress").notNull().default(0),
 answers:text("answers").notNull().default("{}")
});
