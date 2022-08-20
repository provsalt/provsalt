import { Component, createSignal } from "solid-js";

const Contact: Component = () => {

	return (
		<div class="grid place-items-center">
			<div class="flex py-12 align-center flex-col-reverse lg:flex-row">
				<img src="/coffee.jpg" class="max-w-sm rounded-lg" />
				<div class="lg:ml-32">
					<p class="flow-root text-4xl font-bold">Let's talk!</p>
					<p class="flow-root">
            I'm not a robot, please give me some time to get back to you.
					</p>

					<form class="form-control my-2">
						<label class="label">
							<span class="label-text">Email</span>
						</label>
						<input
							name="email"
							type="email"
							autocomplete="email"
							placeholder="me@example.com"
							class="input input-bordered"
						/>
						<label class="label">
							<span class="label-text">Subject</span>
						</label>
						<input
							type="text"
							placeholder="Request for website creation"
							class="input input-bordered"
						/>
						<label class="label">
							<span class="label-text">Message</span>
						</label>
						<textarea class="input input-bordered h-10" />
						<div class="mt-2">
              
							<label class="label">
								<span class="label-text">Are you a robot?</span>
							</label>
						</div>
						<button class="btn btn-success my-4">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
