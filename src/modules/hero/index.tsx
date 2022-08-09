import { DateTime } from "luxon"
import { Component } from "solid-js";

const Hero: Component = () => {

    let now = DateTime.now()
    let start = DateTime.fromSeconds(1526601600)
    let experience = now.diff(start, ['years', 'months']).toObject()
    
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col-reverse lg:flex-row-reverse">
        <img src="/code.jpg" alt="Code" class="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 class="text-5xl font-bold">
            Hi I'm Raymond!
          </h1>
          <p class="py-6">I have made cool stuff with programming for the last {`${experience.years} years and ${experience.months.toFixed(0)} months`} with experiences in Go, Java, PHP, Typescript/Javascript and solidity. </p>
          <button class="btn btn-primary">Learn more!</button>
        </div>
      </div>
    </div>
  );
};

export default Hero