<script lang="ts">
	import { DateTime, Interval } from "luxon";

	let birthday = DateTime.local(2024, 3, 24, {zone: "Asia/Singapore"});
	let timeDiff = Interval.fromDateTimes(DateTime.now(), birthday);
	setInterval(() => {
		timeDiff = Interval.fromDateTimes(DateTime.now(), birthday);
	}, 50);
</script>

<div>
	{#if timeDiff.toDuration(['days', 'hours', 'minutes', 'seconds']).toObject().seconds === undefined}
	    <h1 class="font-bold inter-font text-5xl">
				Happy Birthday!
			</h1>
	{:else}
	<h1 class="font-bold inter-font text-5xl pb-4">My birthday is in...</h1>
	<p class="text-2xl">
		<span>{timeDiff.toDuration(['days', 'hours', 'minutes', 'seconds']).toObject().days} days</span>
		<span>{timeDiff.toDuration(['days', 'hours', 'minutes', 'seconds']).toObject().hours} hours</span>
		<span>{timeDiff.toDuration(['days', 'hours', 'minutes', 'seconds']).toObject().minutes} minutes</span>
		<span>{timeDiff.toDuration(['days', 'hours', 'minutes', 'seconds']).toObject().seconds.toFixed(2)} seconds</span>
	</p>
	{/if}
</div>