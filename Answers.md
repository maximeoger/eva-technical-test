1 - I spent around 4 hours on the backend coding test. I would have liked to 
    split more the code into smaller functions and cleaner architecture using the clean architecture principles 
    and maybe have more time to refactor a little bit. I would also spent more time sharing common typescript interfaces
    between backend and frontend packages with yarn workspaces.

2 - I did it using the day js library (see backend/src/app.service.ts)

3 - I spent around 4 hours on the frontend, my biggest difficulties was to find 
    the correct ratio between time and quality for delivering such feature

4 - I would use the Perf from react performance tool to track down the components 
    that would need refactoring, and maybe using a mix of existing solutions 
    to avoid re-render such as AbortController or React query to handle proper ajax call.
    I think when the applications would get bigger and if a bigger store solution would be needed,
    i would implement some store store solution using recoil instead of react context api.
