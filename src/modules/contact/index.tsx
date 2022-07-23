import { Component, createSignal } from "solid-js";

const Contact: Component = () => {
    const [submit, Submitted] = createSignal(false)
  return (
    <div class="grid place-items-center">
      <div class="flex py-12 align-center flex-col-reverse lg:flex-row">
        <img src="/coffee.jpg" class="max-w-md rounded-lg"></img>
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
              <input
                type="text"
                placeholder="..."
                class="input input-bordered"
              />
              <button class="btn btn-success my-4" >Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
