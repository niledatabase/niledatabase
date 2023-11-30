-- We assume that id, department and manager are coming from an external HR system
-- Therefore we don't enforce uniqueness or autoincrement on id
-- role is coming from the user's roles in the users.tenant_users table
CREATE TABLE IF NOT EXISTS employees (
    id INTEGER,
    tenant_id UUID NOT NULL, -- this is the ID of the Nile tenant that this employee belongs to
    user_id UUID NOT NULL, -- this is the ID of the user in the Nile tenant, we'll use this for lookup when users log in
    name TEXT,
    department INTEGER, 
    manager INTEGER, 
    PRIMARY KEY(tenant_id, id)
--    ,FOREIGN KEY (tenant_id, user_id) REFERENCES users.tenant_users(tenant_id, user_id)
);

CREATE index IF NOT EXISTS employees_by_user ON employees (user_id, tenant_id);

CREATE TABLE IF NOT EXISTS expense_report (
    id INTEGER NOT NULL,
    tenant_id UUID NOT NULL,
    employee_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (tenant_id, id),
    FOREIGN KEY (tenant_id, employee_id) REFERENCES employees(tenant_id, id)
);

CREATE index IF NOT EXISTS expense_report_by_employee ON expense_report (employee_id, tenant_id);

CREATE TABLE EXPENSE_REPORT_ITEMS (
    expense_report_id INTEGER NOT NULL,
    tenant_id UUID NOT NULL,
    id UUID NOT NULL,
    category TEXT NOT NULL,
    vendor TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'USD' NOT NULL,
    expense_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    receipt_url TEXT,
    comment TEXT,
    PRIMARY KEY (tenant_id, expense_report_id, id),
    FOREIGN KEY (tenant_id, expense_report_id) REFERENCES expense_report(tenant_id, id)
);

CREATE index IF NOT EXISTS expense_report_items_by_expense_report ON expense_report_items (expense_report_id, tenant_id);

CREATE TABLE IF NOT EXISTS expense_approvals (
    expense_report_id INTEGER NOT NULL,
    tenant_id UUID NOT NULL,
    approver_id INTEGER NOT NULL,
    approved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    approval_status TEXT NOT NULL,
    reason TEXT,
    PRIMARY KEY (tenant_id, expense_report_id),
    FOREIGN KEY (tenant_id, expense_report_id) REFERENCES expense_report(tenant_id, id),
    FOREIGN KEY (tenant_id, approver_id) REFERENCES employees(tenant_id, id)
);

CREATE index IF NOT EXISTS expense_approvals_by_expense_report ON expense_approvals (expense_report_id, tenant_id);