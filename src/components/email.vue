<template>
	<div class="row" >
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
			<div v-for="(item, i) in infos" class="email">

				<div class="email-img" >
					<img :src="item.owner.avatar_url" />
				</div>
				<div class="email-info" >
					
					<p class="fullname" >
						<span v-for="firstname in item.full_name.split('/')" >{{ firstname }} </span>
					</p>
					<button v-on:click="showModal($event)" class="show">show</button>
					<div class="modal" v-bind:id="'modal-'+i">
						<div class="modal-content" >
							<h2>
								<p class="fullname" >
									<span v-for="firstname in item.full_name.split('/')" >{{ firstname }} </span>
								</p>
							</h2>
							<img :src="item.owner.avatar_url" />
							<p class="description">Description : {{item.description}}</p>
							<p class="stars" >Number of stars : {{ item.stargazers_count }}</p>
							<p class="issues" >Number of issues for the repo : {{item.open_issues_count}}</p>
							<p class="username" > Username : {{item.owner.login}} </p>
							<p class="description">Description : {{item.description}}</p>
							<button v-on:click="hideModal($event)" class="close" > x </button>
						</div>
					</div>
				</div>
			</div> 
		</div>
		
	</div>
</template>


<script>
	import axios from 'axios';
	export default {
		name: 'emails',
		data(){
			return{
				infos: [],
				busy: false,
				modal: false
			}
		},
		methods: {
			loadMore(){
				this.busy = true;
				axios
				.get('https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc')
				.then( response => {
					const append = response.data.items.slice( this.infos.length, this.infos.length + 10 );
					this.infos = this.infos.concat(append);
					this.busy = false;

				}).catch ( (err) => {
					this.busy = false;
				})
			},
			showModal(event){
				let nextElem = event.toElement.nextElementSibling.getAttribute('id');
				document.getElementById(nextElem).style.display = "block"; 
			},
			hideModal(event){
				let id = event.path[2].id;
				document.getElementById(id).style.display = "none";
			}
		},
		created (){
			this.loadMore();
		}
	}

</script>