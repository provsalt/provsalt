<script>
import { page } from "$app/stores";
</script>

<h1 class="text-6xl font-black`">{$page.status}</h1>
<p>Looks like an error occurred: {$page.error.message}</p>