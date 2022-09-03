<script>
  import {link} from 'svelte-spa-router'
  import {info} from '../../stores'
  let profile = $info
</script>

<main>
  {#if profile}
    {profile.lastName} {profile.firstName}
    <br>
    {#if profile.homeroom.id !== ""}
      {profile.homeroom.gradeLetter}{profile.homeroom.gradeNumber}
    {/if}

    <a href="/profile/change-password" use:link>schimba parola</a><br>
    <a href="/profile/change-passcode" use:link>schimba codul de acces</a>
  {/if}
</main>