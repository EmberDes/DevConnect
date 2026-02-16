from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Post, Comment
from django.http import JsonResponse

def register_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("home")
    else:
        form = UserCreationForm()
    return render(request, "register.html", {"form": form})


def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("home")
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {"form": form})


def logout_view(request):
    logout(request)
    return redirect("login")


@login_required
def home(request):

    if request.method == "POST":

        if "post_submit" in request.POST:
            content = request.POST.get("content")
            if content:
                Post.objects.create(
                    author=request.user,
                    content=content
                )
            return redirect("home") 

        if "comment_submit" in request.POST:
            post_id = request.POST.get("post_id")
            comment_content = request.POST.get("comment_content")

            if comment_content:
                post = Post.objects.get(id=post_id)
                Comment.objects.create(
                    post=post,
                    author=request.user,
                    content=comment_content
                )
            return redirect("home")   

    posts = Post.objects.select_related("author") \
    .prefetch_related("comments", "likes") \
    .order_by("-created")
    
    return render(request, "home.html", {"posts": posts})

@login_required
def toggle_like(request, post_id):
    post = Post.objects.get(id=post_id)

    if request.user in post.likes.all():
        post.likes.remove(request.user)
        liked = False
    else:
        post.likes.add(request.user)
        liked = True

    return JsonResponse({
        "liked": liked,
        "total_likes": post.total_likes()
    })