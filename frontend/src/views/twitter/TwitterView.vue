<script setup lang="ts">
import { Home, Mail } from '@iconoir/vue';
import FakeNavButton from './components/FakeNavButton.vue';


</script>

<template>
    <div class="w-full h-full flex">
        <div class="w-20% h-full flex justify-center">
            <div class="w-50% py-5vh">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="size-2.5rem">
                    <g>
                        <path
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                        </path>
                    </g>
                </svg>

                <div class="mt-5vh">
                    <FakeNavButton name="主页">
                        <Home />
                    </FakeNavButton>

                    <FakeNavButton name="消息">
                        <Mail />
                    </FakeNavButton>
                </div>
            </div>
        </div>

        <div class="w-55% h-full bg-red">

        </div>

        <div class="w-25% h-full bg-yellow">
            ???
        </div>
    </div>
</template>