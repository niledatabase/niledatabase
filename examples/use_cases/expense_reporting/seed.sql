-- generating a few IDs for setup:
select public.uuid_generate_v7() as tenant_1 \gset
select public.uuid_generate_v7() as tenant_2 \gset
select public.uuid_generate_v7() as tenant_3 \gset

select public.uuid_generate_v7() as user_1 \gset
select public.uuid_generate_v7() as user_2 \gset
select public.uuid_generate_v7() as user_3 \gset
select public.uuid_generate_v7() as user_4 \gset
select public.uuid_generate_v7() as user_5 \gset
select public.uuid_generate_v7() as user_6 \gset
select public.uuid_generate_v7() as user_7 \gset
select public.uuid_generate_v7() as user_8 \gset
select public.uuid_generate_v7() as user_9 \gset
select public.uuid_generate_v7() as user_10 \gset

-- create personal accounts for everyone
INSERT INTO users.users (id, name, email) VALUES (:'user_1',  'Emily Johnson',       'emily.johnson@gmail.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_2',  'Michael Smith',       'michael.smith@yahoo.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_3',  'Sophia Martinez',     'sophia.martinez@outlook.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_4',  'David Brown',         'david.brown@icloud.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_5',  'Olivia Garcia',       'olivia.garcia@hotmail.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_6',  'James Wilson',        'james.wilson@aol.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_7',  'Isabella Rodriguez',  'isabella.rodriguez@protonmail.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_8',  'William Anderson',    'william.anderson@mail.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_9',  'Mia Thompson',        'mia.thompson@zoho.com');
INSERT INTO users.users (id, name, email) VALUES (:'user_10', 'Ethan Taylor',        'ethan.taylor@fastmail.com');

-- create a few companies
INSERT INTO tenants (id, name) VALUES (:'tenant_1', 'Quantum Innovations Inc.');
INSERT INTO tenants (id, name) VALUES (:'tenant_2', 'Bright Horizon Enterprises');
INSERT INTO tenants (id, name) VALUES (:'tenant_3', 'Crestview Technology Solutions');

-- connect users to companies
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_1', :'user_1', 'ejohnson@quantuminv.com','{"admin"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_1', :'user_2', 'msmith@quantuminv.com','{"manager"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_1', :'user_3', 'martinex@quantuminv.com','{"engineer"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_2', :'user_4', 'dbrown@brighthorizon.com','{"manager"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_2', :'user_5', 'ogarcia@brighthorizon.com','{"lawyer"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_2', :'user_6', 'jwilson@brighthorizon.com','{"intern"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_2', :'user_7', 'rodriguez@brighthorizon.com','{"lawyer"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_3', :'user_8', 'andreson@crestview.com','{"admin"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_3', :'user_9', 'thompson@crestview.com','{"teacher"}');
insert into users.tenant_users (tenant_id, user_id, email, roles) 
    values (:'tenant_3', :'user_10', 'taylor@crestview.com','{"teacher"}');

-- employees
-- note that the name is denormalized, but I'd feel weird doing a 3-way join to get the name
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_1', 1, :'user_1', 'Emily Johnson', 2);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_1', 2, :'user_2', 'Michael Smith', null);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_1', 3, :'user_3', 'Sophia Martinez', 2);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_2', 4, :'user_4', 'David Brown', null);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_2', 5, :'user_5', 'Olivia Garcia', 4);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_2', 6, :'user_6', 'James Wilson', 4);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_2', 7, :'user_7', 'Isabella Rodriguez', 4);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_3', 8, :'user_8', 'William Anderson', null);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_3', 9, :'user_9', 'Mia Thompson', 8);
INSERT INTO employees (tenant_id, id, user_id, name, manager) VALUES (:'tenant_3', 10, :'user_10', 'Ethan Taylor', 8);

-- expense reports
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_1', 1, 1, 'submitted');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_1', 2, 1, 'processed');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_1', 3, 1, 'submitted');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_1', 4, 2, 'submitted');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_1', 5, 2, 'waiting payment');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_1', 6, 3, 'submitted');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_2', 7, 4, 'pending');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_2', 8, 4, 'cancelled');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_2', 9, 6, 'submitted');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_3', 10, 8, 'paid');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_3', 11, 8, 'submitted');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_3', 12, 10, 'submitted');
INSERT INTO expense_report (tenant_id, id, employee_id, status) VALUES (:'tenant_3', 13, 10, 'submitted');

-- expense report items
-- report 1
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_1', 1, public.uuid_generate_v7(), 'OpenAI', 'OpenAI', 342);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_1', 1, public.uuid_generate_v7(), 'Gym', 'Fitness World', 125);

-- report 2
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_1', 2, public.uuid_generate_v7(), 'Spa', 'Serenity Spa', 230);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_1', 2, public.uuid_generate_v7(), 'Conferences', 'Event Horizon', 510);

-- report 3
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_1', 3, public.uuid_generate_v7(), 'OpenAI', 'Innovative Tech Ltd.', 276);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_1', 3, public.uuid_generate_v7(), 'Gym', 'Active Life Gym', 123);


-- report 4
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_1', 4, public.uuid_generate_v7(), 'Office Supplies', 'OfficeMart', 317);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_1', 4, public.uuid_generate_v7(), 'Other', 'Misc Goods Ltd.', 204);

-- report 5
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_1', 5, public.uuid_generate_v7(), 'Meals', 'Urban Eats', 123);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_1', 5, public.uuid_generate_v7(), 'Travel', 'Skyline Travel', 430);

-- report 6
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_1', 6, public.uuid_generate_v7(), 'Spa', 'Relaxation Retreat', 154);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_1', 6, public.uuid_generate_v7(), 'Conferences', 'Conference Connect', 500);

-- report 7
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_2', 7, public.uuid_generate_v7(), 'Travel', 'Global Getaways', 452);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_2', 7, public.uuid_generate_v7(), 'Meals', 'City Diner', 89);

-- report 8
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_2', 8, public.uuid_generate_v7(), 'Other', 'Misc Goods Ltd.', 204);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_2', 8, public.uuid_generate_v7(), 'Training', 'Training Partners', 289);
-- report 9
    insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_2', 9, public.uuid_generate_v7(), 'Office Supplies', 'Stationery Plus', 190);
    insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_2', 9, public.uuid_generate_v7(), 'Other', 'General Goods Inc.', 367);
-- report 10
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_3', 10, public.uuid_generate_v7(), 'Classroom Supplies', 'Educational Emporium', 312);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_3', 10, public.uuid_generate_v7(), 'Training', 'Professional Development Co.', 540);

-- report 11
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_3', 11, public.uuid_generate_v7(), 'OpenAI', 'NextGen Innovations', 298);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_3', 11, public.uuid_generate_v7(), 'Gym', 'Peak Fitness', 100);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)    
    values (:'tenant_3', 11, public.uuid_generate_v7(), 'Spa', 'Heavenly Spa Retreat', 220);

-- report 12
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_3', 12, public.uuid_generate_v7(), 'Travel', 'Wanderlust Travel Agency', 375);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_3', 12, public.uuid_generate_v7(), 'Meals', 'Gourmet Bistro', 145);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_3', 12, public.uuid_generate_v7(), 'Office Supplies', 'Workplace Essentials', 89);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_3', 12, public.uuid_generate_v7(), 'Other', 'All-Purpose Supplies', 175);

-- report 13
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount) 
    values (:'tenant_3', 13, public.uuid_generate_v7(), 'Classroom Supplies', 'Educator''s Warehouse', 333);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_3', 13, public.uuid_generate_v7(), 'Training', 'Skill Builders Inc.', 410);
insert into expense_report_items (tenant_id, expense_report_id, id, category, vendor, amount)
    values (:'tenant_3', 13, public.uuid_generate_v7(), 'Other', 'Diverse Needs Ltd.', 95);
