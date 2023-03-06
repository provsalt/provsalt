Well there first of all, welcome to my blog where I talk about random stuff that no one will ever read.
## So... what about sveltekit?
While sveltekit is almost pure hype, I personally felt that it lives up to the hype and love the framework. It is so much better than react in terms of both performance and speed since it also uses vite which is really fast. Since sveltekit came out of beta recently, I decided to write my portfolio in purely svelte and typescript and here are a few things I love about it.
## Svelte is simple
To me, react felt simple however, after trying to get beginners who have knowledge in html to learn react, safe to say, I was wrong. However svelte actually feels like you are writing HTML and not some jsx with react dom and a lot of confusing abstractions. With svelte, it just works and if anything, just consult the documentation since it's well documented.
## Svelte stores are awesome
Gone are the days of trying to use the built-in useState(), useContext() or even redux. All that annoying boilerplate code of stores, reducers and what not, is literally built in into svelte. React just doesn't offer that and useContext still kinda uses states with the provider.

With Svelte, all that pain is solved by a few lines of code![Using stores in svelte](https://raw.githubusercontent.com/provsalt/provsalt/stable/src/lib/blogs/my-experience-with-sveltekit/store.png)
It is so dead simple that I wonder why other frameworks haven't stolen this yet...
## Conclusion
While it is true that svelte has a lot of cool features, there are a few cons that I picked out such as the +page.svelte naming convention. It doesn't really explicitly state what page I'm working with and just imagine if you have a large scale application being worked on multiple developers. There may be code which slips into another page by accident.
Overall, I'm satisfied with what svelte has to offer, So far, I have rewritten my website 3 times in solid-start, nextjs and now svelte. I'm really happy on how this website turned out and I will indeed continue to use svelte for newer projects that I will work on.