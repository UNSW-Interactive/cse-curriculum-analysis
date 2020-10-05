update courses
set grad_level='undergraduate'
where grad_level is null;

update courses
set grad_level='both'
where course_code = ANY(ARRAY['COMP4121', 'COMP4141', 'COMP4161', 'COMP4511', 'COMP6324', 'COMP6441', 'COMP6443', 'COMP6445', 'COMP6451', 'COMP6452', 'COMP6714', 'COMP6741', 'COMP6841', 'COMP6843', 'COMP6845', 'COMP9242', 'COMP9243', 'COMP9301', 'COMP9302', 'COMP9315', 'COMP9318', 'COMP9321', 'COMP9323', 'COMP9332', 'COMP9417', 'COMP9418']);