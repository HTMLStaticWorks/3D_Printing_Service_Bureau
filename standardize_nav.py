import os
import re

html_files = [
    "about.html", "blog.html", "contact.html", "dashboard-admin.html", 
    "dashboard.html", "home2.html", "index.html", "materials.html", 
    "portfolio.html", "pricing.html", "services.html", "login.html", "signup.html"
]

# Standard Desktop Buttons HTML (XL expansion)
desktop_buttons_xl = """                <!-- Desktop Buttons -->
                <div class="d-none d-xl-flex gap-2 align-items-center">
                    <button class="rtl-toggle">RTL</button>
                    <button class="theme-switch" aria-label="Toggle Theme">
                        <i class="fas fa-moon"></i>
                    </button>
                    <a href="login.html" class="btn btn-primary header-btn ms-1">Login</a>
                </div>"""

# Standard Desktop Buttons HTML (LG expansion for dashboard)
desktop_buttons_lg = """                <!-- Desktop Buttons -->
                <div class="d-none d-lg-flex gap-2 align-items-center">
                    <button class="rtl-toggle">RTL</button>
                    <button class="theme-switch" aria-label="Toggle Theme">
                        <i class="fas fa-moon"></i>
                    </button>
                    <a href="login.html" class="btn btn-primary header-btn ms-1">Login</a>
                </div>"""

# Standard Mobile Buttons HTML (Hidden on XL desktop)
mobile_buttons = """                <div class="nav-auth-buttons d-xl-none">
                    <button class="rtl-toggle">RTL</button>
                    <button class="theme-switch" aria-label="Toggle Theme">
                        <i class="fas fa-moon"></i>
                    </button>
                    <a href="login.html" class="btn btn-primary header-btn">Login</a>
                </div>"""

for filename in html_files:
    if not os.path.exists(filename):
        continue
        
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Remove duplicate Header comments
    content = re.sub(r'(<!-- Header -->\s*){2,}', '<!-- Header -->\n', content)

    # 2. Update Desktop Buttons (XL)
    content = re.sub(
        r'<!-- Desktop Buttons -->\s*<div class="d-none d-xl-flex gap-2 align-items-center">.*?</div>',
        desktop_buttons_xl,
        content,
        flags=re.DOTALL
    )
    # Handle original toggles div if it still exists
    content = re.sub(
        r'<!-- Desktop Toggles -->\s*<div class="d-none d-xl-flex gap-2">.*?</div>',
        desktop_buttons_xl,
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'<div class="d-none d-xl-flex gap-2">.*?</div>',
        desktop_buttons_xl,
        content,
        flags=re.DOTALL
    )

    # 3. Update Desktop Buttons (LG) - for dashboard
    content = re.sub(
        r'<!-- Desktop Toggles -->\s*<div class="d-none d-lg-flex gap-2">.*?</div>',
        desktop_buttons_lg,
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'<div class="d-none d-lg-flex gap-2">.*?</div>',
        desktop_buttons_lg,
        content,
        flags=re.DOTALL
    )

    # 4. Update Mobile Auth Buttons Group (adding d-xl-none to hide on desktop)
    content = re.sub(
        r'<div class="nav-auth-buttons.*?</div>',
        mobile_buttons,
        content,
        flags=re.DOTALL
    )

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Standardized {filename}")
