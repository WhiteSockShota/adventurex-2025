<script setup lang="ts">
import { Home, Mail } from '@iconoir/vue';
import FakeNavButton from './home/components/FakeNavButton.vue';
</script>

<template>
    <div class="w-full h-full flex">
        <div class="w-25% h-full flex justify-center">
            <div class="w-fit py-5vh">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="size-2.5rem ms-5">
                    <g>
                        <path
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                        </path>
                    </g>
                </svg>

                <div class="mt-5vh">
                    <RouterLink to="/twitter" style="all: unset;">
                        <FakeNavButton name="主页">
                            <Home />
                        </FakeNavButton>
                    </RouterLink>

                    <RouterLink to="/twitter/messages" class="inline-block" style="all: unset;">
                        <FakeNavButton name="消息">
                            <Mail />
                        </FakeNavButton>
                    </RouterLink>
                </div>
            </div>
        </div>

        <div class="w-50% h-full border-black/20 border-[0.05px] border-x-solid">

            <RouterView class="overflow-y-auto"></RouterView>

        </div>

        <div class="w-25% h-full">

        </div>
    </div>
</template>
