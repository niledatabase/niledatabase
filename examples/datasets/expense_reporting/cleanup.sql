-- Script to cleanup the expense reporting example

DROP TABLE IF EXISTS expense_report_items cascade;
DROP TABLE IF EXISTS expense_report_comments cascade;
DROP TABLE IF EXISTS expense_report cascade;
DROP TABLE IF EXISTS expense_approvals cascade;
DROP TABLE IF EXISTS employees cascade;
