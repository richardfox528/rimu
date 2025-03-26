from django.shortcuts import render, get_object_or_404


def index(request):
    """Render the index page."""
    context = {
        "title": "Home Page",
        # Add any other context data you need
    }
    return render(request, "index.html", context)


def services(request):
    """Render the services page."""
    context = {
        "title": "Services",
    }
    return render(request, "services.html", context)


def contact(request):
    """Render the contact page."""
    context = {
        "title": "Contact",
    }
    return render(request, "contact.html", context)
