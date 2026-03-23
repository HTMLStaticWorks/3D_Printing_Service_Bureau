import os
import re

html_files = [f for f in os.listdir(".") if f.endswith(".html")]

new_nav = """    <!-- Header -->
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand brand-logo-container" href="index.html">
                <i class="fas fa-cube brand-logo-icon"></i>
                <span class="brand-name">PRECISION 3D</span>
            </a>
            
            <div class="d-flex align-items-center order-lg-3 ms-auto">
                <button class="theme-switch me-3" id="theme-toggle" aria-label="Toggle Theme">
                    <i class="fas fa-moon"></i>
                </button>
                <button class="navbar-toggler border-0 shadow-none p-0 custom-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav justify-content-center flex-grow-1 pe-lg-3 mt-3 mt-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home 1</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="home2.html">Home 2</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="services.html">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="pricing.html">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="blog.html">Blog</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html">Contact</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dashboardDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Dashboard
                        </a>
                        <ul class="dropdown-menu border-0 shadow-lg text-center" aria-labelledby="dashboardDropdown">
                            <li><a class="dropdown-item" href="dashboard-admin.html">Admin Dashboard</a></li>
                            <li><a class="dropdown-item" href="dashboard.html">User Dashboard</a></li>
                        </ul>
                    </li>
                </ul>
                <div class="nav-auth-buttons d-flex mt-4 mt-lg-0 gap-3 ms-lg-3">
                    <a href="login.html" class="btn btn-outline-primary header-btn">Login</a>
                    <a href="signup.html" class="btn btn-primary header-btn">Sign Up</a>
                    <button class="rtl-toggle" id="rtl-toggle">RTL</button>
                </div>
            </div>
        </div>
    </nav>"""

for f in html_files:
    content = open(f, "r", encoding="utf-8").read()
    if "<nav class=\"navbar" in content:
        new_content = re.sub(r'<nav class="navbar.*?</nav>', new_nav, content, flags=re.DOTALL)
        if new_content != content:
            with open(f, "w", encoding="utf-8") as out:
                out.write(new_content)
            print(f"Updated {f}")
